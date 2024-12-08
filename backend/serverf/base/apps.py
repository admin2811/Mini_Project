from django.apps import AppConfig
import numpy as np
import pandas as pd
from pymongo import MongoClient
from .kmean import TeamClustering

team_clustering = None
final_df = None

class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'
    def ready(self):
        global team_clustering, final_df

        client = MongoClient("mongodb://localhost:27017/")
        db = client['MiniProject'] 
        collection = db['test']

        fields = {"Tên": 1, "Điểm tổng kết môn QT HTTT": 1, "Khai phá dữ liệu": 1, "Học máy": 1, "Sở thích": 1, "Kĩ năng làm việc": 1,"Hoạt động chính": 1, "Nguồn thông tin": 1 , "_id": 0}
        documents = collection.find({}, fields)

        df = pd.DataFrame(list(documents))

        team_clustering = TeamClustering(data=df, n_clusters=4, max_group_size=5)

        final_df = team_clustering.run()

        print("Kmean model initialized and trained successfully!")