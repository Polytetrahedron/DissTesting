import bs4
from bs4 import BeautifulSoup
from urllib.request import urlopen

def get_google_rss():
    """
    Adapted from a W3 example of extracting data from googles RSS XML
    this method will be updated and changed to be more functional as I become
    more familiar with the concept of web scraping. This will do for now.
    """

    extracted_stories = []

    rss_feed = "https://news.google.com/news/rss"
    scraper = urlopen(rss_feed)
    extract_XML = scraper.read()
    scraper.close()

    soup_page = BeautifulSoup(extract_XML, "lxml")
    news_list = soup_page.findAll("item")

    for news in news_list:
        if len(extracted_stories) < 10:
            extracted_stories.append(news.title.text)
    
    print(extracted_stories)
    return extracted_stories


def get_expanded_article():
    pass
        
get_google_rss()