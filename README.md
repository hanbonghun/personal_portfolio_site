
# Personal blog made with node js

You can create a fast and simple personal blog based on node js.



### Installation

1. 

    Get a openweather API Key at https://openweathermap.org/

    Get a Kakao app Key at https://developers.kakao.com/  

    Create a cluster on www.mongodb.com and get the connection string.

    Refer to https://developers.kakao.com/docs/latest/en/kakaologin/common to get your own kakao userid.

    Finally, set the secret value of session .


2. Clone the repo
```
git clone http://khuhub.khu.ac.kr/2017104038/personal_portfolio_site.git
```


3. Install NPM packages
```
npm install
```


4. Create an .env file in the personal_portfolio_site folder and enter the contents of step 1.
```
KAKAO_LOGIN_CLIENT_ID = "ENTER YOUR KAKAO APP KEY"
SESSION_SECRET =  "ENTER SESSION SECRET VALUE"
CONNECT_STRING = "ENTER YOUR MONGODB CONNECTION STRING"
KAKAO_ID = ENTER YOUR KAKAO_ID
OPENWEATHER_API_KEY = "ENTER YOUR OPENWEATHER API KEY"
```



### Usage


Execute the code below to connect to the server.

```
node index.js
```

Home page 

![캡처](/uploads/041cd7240e4947bc319727b499e7a477/캡처.PNG)


article 

![캡처](/uploads/b7a59c0818f5d3e7f1c4779a059e86d9/캡처.PNG)

When login is successful, the administrator can write, edit, and delete posts.
![캡처](/uploads/3bfe82bd033ffaa96002b32d9f405f11/캡처.PNG)

posts
![캡처](/uploads/893447e823a014353dfb5529ce0840de/캡처.PNG)



