
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

![캡처_2023_03_22_00_20_58_915](https://user-images.githubusercontent.com/33712528/226654276-62245a62-f8ee-40aa-b112-4751a86e84cd.png)


article (When login is successful, the administrator can write, edit, and delete posts.)

![캡처_2023_03_22_00_22_12_61](https://user-images.githubusercontent.com/33712528/226654399-27816c61-e2c7-46f2-a56c-c25ae47bc149.png)

posts
![캡처_2023_03_22_00_25_06_374](https://user-images.githubusercontent.com/33712528/226655022-b3865859-23fa-4dac-a88e-027f2ffb7793.png)

about
![캡처_2023_03_22_00_25_03_963](https://user-images.githubusercontent.com/33712528/226655000-8cc8e8ab-7265-47aa-8a52-6071aa3d6fd4.png)


