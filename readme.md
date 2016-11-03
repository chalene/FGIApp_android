# A react native app for FGI weidaili

## Installation
Require node.js & xcode

1. `npm install`

2. `run DNA.xcodeproj` or `react-native run-android`

3. run on xcode ios simulator (for generic device, check v0.1 - release branch)

## Screenshots


## Server side

node.js server side: https://github.com/fangwei716/ap-express (combined with Algorithm platform)

(passed the test for login and resposed with correct error message.)

### POST: ios-login  

```javascript
router.post('/ios-login', function(req, res, next) {
	var db = req.db,
		collection = db.get('usercollection'),
		user = req.body,
		md5 = crypto.createHash('md5'),
		password = md5.update(user.password).digest('base64');

	collection.findOne({
		"username": user.username
	}, function(err, theUser) {
		if (!theUser) {
			return res.send({
				error: true,
				loginState: "2"
			})
		} else {
			if (theUser.password == password) {
				return res.send({
					error: false,
					uid:theUser._id,
					username: theUser.username,
					loginState: "1",
					isFirstTime: "0" // should read from database
				})

			} else {
				return res.send({
					error: true,
					loginState: "3"
				})

			}
		}
	});

});
```

## Compatibility and Responsibility

iPhone 6(s) plus - pass

iPhone 6(s) - pass

iphone 5(s) - pass

iphone4s - pass

Android - pass

＝＝参数＝＝

主屏尺寸 5.96英寸

主屏材质  Super AMOLED

主屏分辨率  2560x1440像素



屏幕像素密度  493ppi

操作系统  Android OS 7.0

核心数  四核

CPU型号  高通 骁龙805（APQ8084AB）

CPU频率  2.7GHz

GPU型号  高通 Adreno420

RAM容量  3GB

ROM容量  32GB/64GB

＝＝＝＝＝＝＝

