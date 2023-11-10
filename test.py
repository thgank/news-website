import requests
api_url = "https://www.gov.kz/api/v1/public/content-manager/news?sort-by=created_date:DESC&projects=eq:mdai&page=1&size=50"
response = requests.get(api_url)
print(response.json())