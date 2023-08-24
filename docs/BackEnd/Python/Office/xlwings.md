---
title: "xlwings"
date: 2023-08-24
description: ""
---

## 一. 简介

`xlwings`是用于处理`excel`的`python`库，支持`pandas`。
`xlwings`官方文档链接 [https://docs.xlwings.org/en/latest/quickstart.html](https://docs.xlwings.org/en/latest/quickstart.html)

## 二. Excel 文件管理

### 2.1 打开与保存 Excel

建议使用xlwings.App()作为上下文管理器来打开Excel文件。

```python
import xlwings as xw
from xlwings import Book, Sheet

with xw.App() as app:
    # 打开excel
    book: Book = app.books.open("path/to/your/excel.xlsx")
    # 打开表单
    sheet: Sheet = book.sheets["sheet1"]
    # 保存excel
    book.save()
    # 另存为其他路径
    book.save("path/to/save/your/excel.xlsx")
```

### 2.2 新建 Excel

```python
import xlwings as xw
# visible=False 非可视化操作；add_book=False 打开Excel软件时不新建工作簿
with xw.App(visible=False, add_book = False) as app: 
    # 创建工作簿
    book = app.books.add()
    # 保存工作簿
    book.save("path/to/save/your/excel.xlsx")
    # 关闭工作簿
    book.close()
    
```

## 三. Excel 数据操作

`xlwings`通过`Sheet.range()`来选中单元范围。选中范围后，通过`.value`属性获取对应的值，通过`.clear()`方法来删除对应范围的值与格式，通过`.clear_contents()`方法来删除对应范围的值，但是不清除格式，通过`.clear_formats()`来清除格式，但是不删除值。

### 3.1 语法惯例说明

在`xlwings`中，圆括号语法遵循Excel使用惯例，从1开始计数索引。而方括号语法遵循Python语法，从0开始。对于下列例子，所有表达式所取得的范围是相同的：

```python
import xlwings as xw

# xlwings的表示方式比较多样化，建议仅采取一种语法风格 
xw.apps[763].books[0].sheets[0].range('A1')
xw.apps(10559).books(1).sheets(1).range('A1')
xw.apps[763].books['Book1'].sheets['Sheet1'].range('A1')
xw.apps(10559).books('Book1').sheets('Sheet1').range('A1')
```

### 3.2 单元格

#### 3.2.1 单元格选取

通过`range`语法或者`sheet`**索引**来指定单元格。
当范围内仅包含一格时将返回单元格类型。

```python
import xlwings as xw

sheet1 = xw.Book("MyBook.xlsx").sheets[0]

# range表示，圆括号语法，从1开始计数
sheet1.range("A1")  # 圆括号excel坐标
sheet1.range((1,1)) # 圆括号数值坐标

# 索引表示，方括号语法，从0开始计数
sheet1["A1"]
sheet1[0, 0]
```

#### 3.2.2 单元格类型

单元格的返回类型包括`float`,`unicode`,`None`以及`datatime`。

```python
import datetime as dt

sheet = xw.Book().sheets[0]
sheet['A1'].value = 1
sheet['A2'].value = 'Hello'
sheet['A3'].value = None  
sheet['A4'].value = dt.datetime(2000, 1, 1)
```

### 3.3 列表

#### 3.3.1 列表选取

通过`range`语法或者`sheet`**切片**来指定列表。   
当range中只包含一行或者一列时将返回一维列表。包含多行列时则将返回二维列表。

```python
import xlwings as xw

sheet1 = xw.Book("MyBook.xlsx").sheets[0]

# range表示，圆括号语法，从1开始计数
sheet1.range("A1:C3")  # 圆括号excel坐标
sheet1.range("A1", "C3") # 圆括号excel坐标
sheet1.range((1,1), (3,3)) # 圆括号数值坐标

# 切片表示，方括号语法，从0开始计数
heet1["A1:C3"]
sheet1[0:4, 0:4]
sheet1[:4, :4]
```

#### 3.3.2 一维列表

与取值不同，对一维列表进行赋值仅需指定最左侧或者最上侧的单元格即可。然而，Excel中的行或列在python中的返回值为简单的列表，这表明在python中会丢失其方向信息。通过以下方式来指定写入横向或纵向的数据：

```python
sheet = xw.Book().sheets[0]
# 写入列数据
sheet['A1'].value = [[1],[2],[3],[4],[5]]
# 或者使用.options(transpose=True)进行转置写入
sheet['A1'].options(transpose=True).value = [1, 2, 3, 4, 5]
# 取出列数据
print(sheet['A1:A5'].value)  # [1.0, 2.0, 3.0, 4.0, 5.0]
# 写入行数据
sheet['A1'].value = [1, 2, 3, 4, 5]
# 取出行数据
print(sheet['A1:E1'].value)  # [1.0, 2.0, 3.0, 4.0, 5.0]
```

#### 3.3.3 二维列表

与一维列表类似的是，对二维列表进行赋值仅需指定左上角单元格。

```python
# 写入二维列表
sheet['A10'].value = [['Foo 1', 'Foo 2', 'Foo 3'], [10, 20, 30]]
# 读取二维列表
print(sheet.range((10,1),(11,3)).value) # [['Foo 1', 'Foo 2', 'Foo 3'], [10.0, 20.0, 30.0]]
```

#### 3.3.4 升维操作

通过`options()`方法可对范围结果进行升维。这意味着，可将单元格升维成一维或二维列表表示，也可将一维列表升维成二维列表表示。

```python
>>> sheet['A1'].options(ndim=1).value
[1.0]

>>> sheet['A1:A5'].options(ndim=2).value
[[1.0], [2.0], [3.0], [4.0], [5.0]]

>>> sheet['A1:E1'].options(ndim=2).value
[[1.0, 2.0, 3.0, 4.0, 5.0]]
```

### 3.4 范围扩充

通过向`options()`方法传入`expand`参数或者直接使用`expand()`方法可以进行范围扩充。两者的区别在于，`expand()`
返回了一个扩展范围的对象，而`options()`仅是改变对象的 **”呈现方法“**。通过以下的例子来说明：

```python
sheet = xw.Book().sheets[0]
sheet['A1'].value = [[1,2], [3,4]]
range1 = sheet['A1'].expand('table')  # .expand()不传入参数即是table模式扩展
range2 = sheet['A1'].options(expand='table')

print(range1.value)  # [[1.0, 2.0], [3.0, 4.0]]
print(range2.value)  # [[1.0, 2.0], [3.0, 4.0]]
sheet['A3'].value = [5, 6]
print(range1.value)  # [[1.0, 2.0], [3.0, 4.0]]
print(range2.value)  # [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0]]
```

这说明，`expand()`返回了一个范围写死了的对象，而`options()`
没有改变对象，只是改变了对象的 **”呈现方法“**，对于上述例子而言，`options(expand='table')`将一个单元格对象以一个二维列表的方式进行呈现。

扩充的选项包括`table`、`down`、`right`。分别为二维扩充，向下扩充以及向右扩充。默认为`table`。

### 3.5 numpy

读写示例：

```python
import numpy as np

sheet = xw.Book().sheets[0]
sheet['A1'].value = np.eye(3)  # 写入np
sheet['A1'].options(convert=np.array, expand='table').value  # 读取np
```

### 3.6 pandas

#### 3.6.1 `pandas.Series`

读写示例：

```python
import pandas as pd
import numpy as np

sheet = xw.Book().sheets[0]
s = pd.Series([1.1, 3.3, 5., np.nan, 6., 8.], name='myseries')  # 写入pd
sheet['A1'].value = s
sheet['A1:B7'].options(convert=pd.Series).value  # 读取pd
```

#### 3.6.2 `pandas.DataFrame`

读写示例：

```python
import pandas as pd
import numpy as np

sheet = xw.Book().sheets[0]
df = pd.DataFrame([[1.1, 2.2], [3.3, None]], columns=['one', 'two'])
print(df)
"""
打印结果
one  two
0  1.1  2.2
1  3.3  NaN
"""
sheet['A1'].value = df  # 写入pd
print(sheet['A1:C3'].options(pd.DataFrame).value)  # 读取pd
"""
打印结果
one  two
0  1.1  2.2
1  3.3  NaN
"""
sheet['A5'].options(index=False).value = df  # 写入pd
sheet['A9'].options(index=False, header=False).value = df  # 写入pd
```