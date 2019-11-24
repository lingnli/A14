# Restaurant List 「餐廳清單」

- Alphacamp class 3 project:A11
- 使用 Node.js 及 Express 框架打造出的小網頁

## Environment Introduction 適用環境介紹

for windows , MacOS

- Express: 4.17.1
- Node.js v10.16.3

## Web Page 網頁畫面

![Image of indexpage](https://upload.cc/i1/2019/11/25/R4SJv6.png)

## Features 專案功能

- 內建二個種子使用者，各自含三筆種子餐廳資料
  | 種子帳號 | email | password |
  | ---------- | :-----------: | :-----------: |
  | no.1 | user1@example.com | 12345678 |
  | no.2 | user2@example.com | 12345678 |

- 使用者可以建立帳號去管理資料
- 使用者可以使用第三方登入 Facebook 去建立帳號
- 可以新增、修改、刪除餐廳資料
- 使用可以可搜尋餐廳
- 使用者可以依照名稱或評分來顯示帳號內所有餐廳資料

## Installation 安裝專案

1.從 github 下載 資料夾

```
$ git clone https://github.com/lingnli/A14
```

2.開啟 Terminal，進入此專案資料夾

```
cd A14
```

3.使用 npm 安裝套件

```
$ npm install
```

4.進入 models/seeds 資料夾中，產生種子資料

```
$ cd models/seeds
$ node restaurantSeeder.js
```

5.執行專案

```
$ npm run dev
```

並開啟網址
`http://localhost:3000`

## 若需使用 Facebook 登入

在專案中使用 Facebook 所提供的第三方登入，若需使用請按以下步驟操作

1.前往<a href="https://developers.facebook.com/">facebook for developers </a>啟用

2.選擇 整合 Facebook 登入

3.在基本資料中取得應用程式編號及應用程式密鑰

4.移至 A14/config/passport.js 中，將第 42 及 43 行換上第三點取得的編號及密鑰

```
clientID: process.env.FACEBOOK_ID,
clientSecret: process.env.FACEBOOK_SECRET,
```
