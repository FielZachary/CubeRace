import Phaser from 'phaser';
import SceneKeys from '../consts/SceneKeys';
import { LeaderBoard } from 'phaser3-rex-plugins/plugins/firebase-components';

// declare firebase to resolve TypeScript error
declare const firebase: any

var firebaseConfig = {
	apiKey: "AIzaSyAIR8i2ia1-fNmDSFYLWX28TXgmjfE4GLY",
	authDomain: 'cuberace-5d31c.firebaseapp.com',
	databaseURL: 'https://cuberace-5d31c-default-rtdb.firebaseio.com/',
	projectId: 'cuberace-5d31c',
	storageBucket: 'gs://cuberace-5d31c.appspot.com/',
	messagingSenderId: '942525608410',
	appId: '1:942525608410:web:82b444e42e9c16562990e3'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class Leaderboard extends Phaser.Scene
{
	private leaderboard: any	
	constructor()
	{
		super(SceneKeys.Leaderboard)
	}
	init(data: { score: number })
	{
		this.leaderboard = new LeaderBoard({
			root: 'leaderboard'
		})

		// NOTE: each individual player should have a different ID and name
		this.leaderboard.setUser({
			userID: 'test-uid3',
			userName: 'Rocket Man'
		})
	}
}