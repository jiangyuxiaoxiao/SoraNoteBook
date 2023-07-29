FROM python:3.10.12-bookworm
WORKDIR /app/SoraNoteBook
COPY main.py /app/SoraNoteBook
COPY ./requirements.txt /app/SoraNoteBook
RUN pip install --upgrade pip -i https://pypi.tuna.tsinghua.edu.cn/simple
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
EXPOSE 12300
CMD ["python", "main.py"]