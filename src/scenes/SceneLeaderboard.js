import Phaser from 'phaser';
import 'regenerator-runtime'
import { leaderBoard } from "../scenes/SceneStart"
//import SceneKeys from '/consts/SceneKeys';
//mport { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components';
//import firebase from "firebase/app";
//;import "firebase/firestore";


// declare firebase to resolve TypeScript error
// declare const firebase: any



//var firebase;

firebase.initializeApp({
	apiKey: "AIzaSyAIR8i2ia1-fNmDSFYLWX28TXgmjfE4GLY",
	authDomain: 'cuberace-5d31c.firebaseapp.com',
	databaseURL: 'https://cuberace-5d31c-default-rtdb.firebaseio.com/',
	projectId: 'cuberace-5d31c',
	storageBucket: 'gs://cuberace-5d31c.appspot.com/',
	messagingSenderId: '942525608410',
 })

// Initialize Firebase
// firebase.initializeApp(firebaseConfig)

export default class SceneLeaderboard extends Phaser.Scene
{
	

	constructor()
	{
		super("SceneLeaderboard")
	}
	preload()
	{
		this.load.image('LBBG', 'assets/images/LeaderboardScreen.png')
		this.load.image('LBBGTop3', 'assets/images/LeaderboardScreen2.png')
		this.load.image('NextPageOP', 'assets/images/NextPageOP.png')
		this.load.plugin('rexfirebaseplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfirebaseplugin.min.js', true);
		this.load.plugin('rexbuttonplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexbuttonplugin.min.js', true);
	}
	async create()
	{
		this.exitSquare = this.add.rectangle(40, 30, 40, 40, 0x2d2d2d)

		var topUsers;
		topUsers = await leaderBoard.loadFirstPage()

		var topUser = topUsers[0]
		var topTwoUser = topUsers[1]
		var topThreeUser = topUsers[2]

		var UserUsername = localStorage.getItem('username')
		//console.log(UserUsername)

		var UserRank = await leaderBoard.getRank(`${UserUsername}`)    // Remember to plus one since its ranking based off an array
		//console.log(UserRank)

		var UserScore = await leaderBoard.getScore(`${UserUsername}`)

		if (UserRank.rank <= 2 )
		{
			this.bg = this.add.image(0, 0, 'LBBGTop3')
			this.bg.scaleX = 0.47
			this.bg.scaleY = 0.47
			this.bg.setOrigin(0.135, 0.165)
		} else {
			this.bg = this.add.image(0, 0, 'LBBG')
			this.bg.scaleX = 0.47
			this.bg.scaleY = 0.47
			this.bg.setOrigin(0.135, 0.165)
				
			this.UserName = this.add.text(80, 600, `You`, {fontFamily: 'Balsamiq Sans', fontSize: '35px', fontStyle: 'bold', color: "#000000"})
			this.UserTime = this.add.text(300, 595, `time: ${UserScore.score} secs`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})
			this.UserMoves = this.add.text(300, 620, `moves: ${UserScore.moves}`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})

			this.fourthNumText = this.add.text(42.5, 530, `${UserRank.rank + 1}`, {fontFamily: 'Balsamiq Sans', fontSize: '45px', fontStyle: 'bold'})
		}
		//console.log(UserScore)


		this.firstNum = 1;
		this.secondNum = 2;
		this.thirdNum = 3;


		this.firstNumText = this.add.text(50, 70, `${this.firstNum}`, {fontFamily: 'Balsamiq Sans', fontSize: '45px', fontStyle: 'bold'})
		this.secondNumText = this.add.text(42.5, 220, `${this.secondNum}`, {fontFamily: 'Balsamiq Sans', fontSize: '45px', fontStyle: 'bold'})
		this.thirdNumText = this.add.text(47.5, 377, `${this.thirdNum}`, {fontFamily: 'Balsamiq Sans', fontSize: '45px', fontStyle: 'bold'})

		var button2 = this.plugins.get('rexbuttonplugin').add(this.exitSquare, {
            enable: true,
            mode: 0,            // 0|'press'|1|'release'
            // clickInterval: 100  // ms
        });
        button2.on('click', function (button, gameObject, pointer, event) {
    
			this.scene.start('SceneStart')
        }, this);

		

		//console.log(this.topScore)
		// leaderBoard.setUser('1', 'zacurry1').post(10, { moves: '30' });
		// var user1Score = await leaderBoard.getScore('1')

		// leaderBoard.setUser('2', 'BTA Ashy').post(15, { moves: '40' });
		// var user2Score = await leaderBoard.getScore('2')
		// console.log(user2Score)
		// leaderBoard.setUser('3', 'BTA Simang').post(20, { moves: '50' });
		// var user3Score = await leaderBoard.getScore('3')

		// leaderBoard.setUser('4', 'wolfxper').post(25, { moves: '60' });
		// var user4Score = await leaderBoard.getScore('4')


		this.firstUserName = this.add.text(80, 135, `${topUser.userID}`, {fontFamily: 'Balsamiq Sans', fontSize: '35px', fontStyle: 'bold', color: "#000000"})
		this.firstUserTime = this.add.text(300, 130, `time: ${topUser.score* -1} secs`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})
		this.firstUserMoves = this.add.text(300, 155, `moves: ${topUser.moves}`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})

		this.secondUserName = this.add.text(80, 285, `${topTwoUser.userID}`, {fontFamily: 'Balsamiq Sans', fontSize: '35px', fontStyle: 'bold', color: "#000000"})
		this.secondUserTime = this.add.text(300, 280, `time: ${topTwoUser.score* -1} secs`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})
		this.secondUserMoves = this.add.text(300, 305, `moves: ${topTwoUser.moves}`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})

		this.thirdUserName = this.add.text(80, 445, `${topThreeUser.userID}`, {fontFamily: 'Balsamiq Sans', fontSize: '35px', fontStyle: 'bold', color: "#000000"})
		this.thirdUserTime = this.add.text(300, 440, `time: ${topThreeUser.score * -1} secs`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})
		this.thirdUserMoves = this.add.text(300, 465, `moves: ${topThreeUser.moves}`, {fontFamily: 'Balsamiq Sans', fontSize: '23px', fontStyle: 'bold', color: "#A1A3A6"})


		//this.fourthNumText.text = `${UserRank.rank + 1}`






	}
}