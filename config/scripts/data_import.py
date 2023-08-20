#//config/scripts/data_import.py
import pandas as pd
from pymongo import MongoClient

# Leer el archivo Excel
data = pd.read_excel('caminho_para_o_arquivo.xlsx')

# Conectar al MongoDB
client = MongoClient(process.env.MONGODB_URI)
db = client['nombre_del_db']
collection = db['nombre_de_la_coleccion']

# Insertar datos en MongoDB
collection.insert_many(data.to_dict('records'))
