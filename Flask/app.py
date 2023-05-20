from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
import requests
import json
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout

from keras.optimizers import SGD
from tensorflow.keras.optimizers import SGD
import random
import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import json
import pickle
intents_file = open('intents.json').read()
intents = json.loads(intents_file)
import nltk
from nltk.corpus import stopwords

words=[]
classes = []
documents = []


import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
from keras.models import load_model
#model = load_model('chatbot_model.h5')
import json
import random
intents = json.loads(open('intents.json').read())
words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))
print(words)
def clean_up_sentence(sentence):
    # tokenize the pattern - splitting words into array
    sentence_words = nltk.word_tokenize(sentence)
    # stemming every word - reducing to base form
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words
# return bag of words array: 0 or 1 for words that exist in sentence
def bag_of_words(sentence, words, show_details=True):
    # tokenizing patterns
    sentence_words = clean_up_sentence(sentence)
    # bag of words - vocabulary matrix
    bag = [0]*len(words)  
    for s in sentence_words:
        for i,word in enumerate(words):
            if word == s: 
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % word)
    return(np.array(bag))
def predict_class(sentence):
    # filter below  threshold predictions
    p = bag_of_words(sentence, words,show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    # sorting strength probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list
def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag']== tag):
            result = random.choice(i['responses'])
            break
    return result
import numpy as np
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
# from keras.optimizers import SGD
from tensorflow.keras.optimizers import SGD
import random

import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import json
import pickle

words=[]
classes = []
documents = []
ignore_letters = ['!', '?', ',', '.']
intents_file = open('intents.json').read()
intents = json.loads(intents_file)

for intent in intents['intents']:
    for pattern in intent['patterns']:
        #tokenize each word
        word = nltk.word_tokenize(pattern)
        words.extend(word)
        #add documents in the corpus
        documents.append((word, intent['tag']))
        # add to our classes list
        if intent['tag'] not in classes:
            classes.append(intent['tag'])
print(documents)
# lemmaztize and lower each word and remove duplicates
words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_letters]
words = sorted(list(set(words)))
# sort classes
classes = sorted(list(set(classes)))
# documents = combination between patterns and intents
print (len(documents), "documents")
# classes = intents
print (len(classes), "classes", classes)
# words = all words, vocabulary
print (len(words), "unique lemmatized words", words)

pickle.dump(words,open('words.pkl','wb'))
pickle.dump(classes,open('classes.pkl','wb'))

# create our training data
training = []
# create an empty array for our output
output_empty = [0] * len(classes)
# training set, bag of words for each sentence
for doc in documents:
    # initialize our bag of words
    bag = []
    # list of tokenized words for the pattern
    pattern_words = doc[0]
    # lemmatize each word - create base word, in attempt to represent related words
    pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]
    # create our bag of words array with 1, if word match found in current pattern
    for word in words:
        bag.append(1) if word in pattern_words else bag.append(0)
        
    # output is a '0' for each tag and '1' for current tag (for each pattern)
    output_row = list(output_empty)
    output_row[classes.index(doc[1])] = 1
    
    training.append([bag, output_row])
# shuffle our features and turn into np.array
random.shuffle(training)
training = np.array(training)
#create train and test lists. X - patterns, Y - intents
train_x = list(training[:,0])
train_y = list(training[:,1])
print("Training data created")

# Create model - 3 layers. First layer 128 neurons, second layer 64 neurons and 3rd output layer contains number of neurons
# equal to number of intents to predict output intent with softmax
model = Sequential()
model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(64, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(len(train_y[0]), activation='softmax'))

#Compile model. Stochastic gradient descent with Nesterov accelerated gradient gives good results for this model
sgd = SGD(lr=0.01, decay=1e-6, momentum=0.9, nesterov=True)
model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

#fitting and saving the model 
hist = model.fit(np.array(train_x), np.array(train_y), epochs=172, batch_size=5, verbose=1)
model.save('chatbot_model.h5', hist)

print("model created")

msg = ["Hi","Fine","good","awesoome","yes"]
text = str()


def responsed(msg1):
    msg.append(msg1)
    ints = predict_class(msg1)
    res = getResponse(ints, intents)
    return res

import json
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions

def song_emotion():
    authenticator = IAMAuthenticator('san26uA9-llBxHaivNoNaT9qgIfudaKchd7zNmyH06CP')
    nlu = NaturalLanguageUnderstandingV1(
        version='2019-07-12',
        authenticator=authenticator
    )
    nlu.set_service_url('https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/fd4d3773-9d20-43fe-8591-32e520cc4323')

    len1 = len(msg)
    print(len1)
    text = msg[len1-1]+" "+msg[len1-2]+" "+msg[len1-3]+" "+msg[len1-4]
    #+" "+msg[len1-5]

    response = nlu.analyze(
        text=text,
        features=Features(sentiment=SentimentOptions()),
        language='en'

    ).get_result()

    dic1 = dict()
    sentiment = response["sentiment"]["document"]["label"]
    dic1["emotion"] = sentiment
    print("sentiment",sentiment)
    import requests
    import os

    api_key = os.environ.get("LAST_FM_API_KEY")
    url = f"http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag={sentiment}&api_key={'e16463994db4347714f01209f802fea0'}&format=json&lang=te&limit=12"
    try:
        response = requests.get(url)
        payload = response.json()
        print("payload")
        print(payload)
        
        for i in range(10):
            r=payload['tracks']['track'][i]
            dic1[r['name']] = r['url']
    except:
        dic1['error'] = "Error fetching the top tracks"
    return payload['tracks']['track']

import requests

url=f"http://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=happy&api_key={'e16463994db4347714f01209f802fea0'}&format=json&lang=fr&limit=5"
response = requests.get(url)
payload = response.json()
# for i in range(4):
r=payload['tracks']['track'][0]
# print(r['url'])
print(payload)
class Songgs:
    def __init__(self, title, url):
        self.title = title
        self.url = url
 
import db
#test to insert data to the data base
@app.route("/signup", methods=['POST'])
def signup():
    message = request.get_json()['user']
    print(message)
    db.db.collection.insert_one(message)
    return "Connected to the data base!"

@app.route("/login", methods=['POST'])
def login():
    message = request.get_json()['user']
    print(message)
    sol=db.db.collection.find_one({"email":message['email']})
    print(sol)
    response=''
    if(sol is None):
        response="Not Found"
    else:
        if(sol['password'] == message["password"]):
            response="successful"
        else:
            response="unsuccessful"
        

    # db.db.collection.insert_one(message)
    return response

@app.route('/chatbot', methods=['POST'])
def chatbot():
    message = request.get_json()['message']
    # process the message and generate a response
    #response = generate_response(message)
    response = responsed(message)
    #print("Chatbot : "+res)
    return jsonify(response=response)

@app.route('/songs', methods=['GET'])
def songs():
    ans = song_emotion()
    return ans




@app.route('/spotify', methods=['POST'])
def spotify():
    lang= request.get_json()['lang']
    authenticator = IAMAuthenticator('san26uA9-llBxHaivNoNaT9qgIfudaKchd7zNmyH06CP')
    nlu = NaturalLanguageUnderstandingV1(
        version='2019-07-12',
        authenticator=authenticator
    )
    nlu.set_service_url('https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/fd4d3773-9d20-43fe-8591-32e520cc4323')

    len1 = len(msg)
    print(len1)
    text = msg[len1-1]+" "+msg[len1-2]+" "+msg[len1-3]+" "+msg[len1-4]+" "+msg[len1-5]+msg[len1-6]+msg[len1-7]+msg[len1-8]

    response = nlu.analyze(
        text=text,
        features=Features(sentiment=SentimentOptions()),
        language='en'

    ).get_result()

    dic1 = dict()
    sentiment = response["sentiment"]["document"]["label"]
    dic1["emotion"] = sentiment
    print("sentiment",sentiment)
    # process the message and generate a response
    #response = generate_response(message)
    play=''
    if(lang=='telugu'):
        if(sentiment=='positive'):
            play='4jW37umAGFKr2oQRAk5pAe'
        elif(sentiment=='negative'):
            play='1au999SJjuuDAXxphTupDK'
        elif(sentiment=='neutral'):
            play='37i9dQZF1DXdMUUSqm9tTc'
    elif(lang=='hindi'):
        if(sentiment=='positive'):
            play='78kBHYaQsF6zntWU9R6ziQ'
        elif(sentiment=='negative'):
            play='4YOfhHpjPB0tq29NPpDY3F'
        else:
            play='37i9dQZF1DWTwbZHrJRIgD'
    elif(lang=='english'):
        if(sentiment=='positive'):
            play='6Sqga5OO2KJfD55EfI4KRN'
        elif(sentiment=='negative'):
            play='1SFqUFgLIOtQ575KObfpwM'
        else:
            play='1m05paiRzBhAL1SRFsPjil'
    elif(lang=='tamil'):
        if(sentiment=='positive'):
            play='16l83x4QgYPR6mWFQzpazV'
        elif(sentiment=='negative'):
            play='37i9dQZF1DX3bcfiyW6qms'
        else:
            play='4LofyaDGT8cMr6KehRhMow'
    elif(lang=='punjabi'):
        if(sentiment=='positive'):
            play='37W9XquSdYtxK3wH4tRdw9'
        elif(sentiment=='negative'):
            play='37i9dQZF1DWWfmbQgZIznF'
        else:
            play='37i9dQZF1DWZEYG45EmWYV'
        
    import requests

    # Replace with your own Spotify API credentials
    CLIENT_ID = "3407eab136d84914942a390dd520f1db"
    CLIENT_SECRET = "02673a03a80d4b79a467813dd925cb0d"

    # Replace with the playlist ID you want to fetch songs from
    PLAYLIST_ID = "4jW37umAGFKr2oQRAk5pAe"

    # Set up authorization flow
    AUTH_URL = "https://accounts.spotify.com/api/token"
    auth_response = requests.post(
    AUTH_URL,
    {
    "grant_type": "client_credentials",
    "client_id": CLIENT_ID,
    "client_secret": CLIENT_SECRET,
    },
    )
    auth_response_data = auth_response.json()
    access_token = auth_response_data["access_token"]

    # Set up request headers
    headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json",
    }

    # Fetch playlist details
    PLAYLIST_URL = f"https://api.spotify.com/v1/playlists/{play}?limit=30"
    playlist_response = requests.get(PLAYLIST_URL, headers=headers)
    playlist_data = playlist_response.json()
    TRACKS_URL = playlist_data["tracks"]["href"]
    tracks_response = requests.get(TRACKS_URL, headers=headers)
    tracks_data = tracks_response.json()
    # Fetch playlist tracks
    return tracks_data



CONNECTION_STRING="mongodb+srv://megadrive037:VenuDevulapally@cluster0.hmnc1se.mongodb.net/?retryWrites=true&w=majority"    

if __name__ == '__main__':
    app.run(port=5000,debug=True, use_reloader=False)
