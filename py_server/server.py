import hug
import json
import random
import time


@hug.get('/dashboard_data')
def return_dashboard_data(response):
    result = []
    time.sleep(random.uniform(0.5, 3))
    with open('dashboard_data.json', encoding='utf-8') as json_data:
        result = json.load(json_data)
    response.set_header('Access-Control-Allow-Origin', '*')
    response.set_header('Content-Type', 'application/json; charset=utf-8')
    return result
