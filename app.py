from flask import Flask, render_template
import requests
from datetime import datetime

app = Flask(__name__)

API_BASE_URL = "https://www.gov.kz/api/v1/public/content-manager/news?sort-by=created_date:DESC&projects=eq:mdai&page=1&size=50"

# get data
def get_news_data():
    response = requests.get(API_BASE_URL)
    
    if response.status_code == 200:
        news_data = response.json()
        return news_data
    else:
        return [] #return nothing if api is empty

@app.route('/')

#function to parse data and format it as (Day, Month)
def index():
    news_data = get_news_data()

    for news_item in news_data:
        # parse date and format it
        parsed_date = datetime.strptime(news_item['created_date'], '%Y-%m-%dT%H:%M:%S.%f%z')
        news_item['formatted_date'] = parsed_date.strftime('%d %B %Y')

    return render_template('index.html', news=news_data)

if __name__ == '__main__':
    app.run(debug=True)
