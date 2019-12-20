enchant();

window.onload = function () {
	var game = new Game(500, 550);  				//画面サイズを500*500にする。

	//結果ツイート時にURLを貼るため、このゲームのURLをここに記入
	var url = "[http://bit.do/BANANA]";
	var orange_url = encodeURI("[ https://twitter.com/hemuhunune ]");
	url = encodeURI(url); //きちんとURLがツイート画面に反映されるようにエンコードする

	/////////////////////////////////////////////////
	//ゲーム開始前に必要な画像・音を読み込む部分

	// 音関係読み込み初め

	//SoundLoad();
		//歩く音
		var runSound = new Array();
		runSound[0] = "walk1.mp3";
		game.preload([runSound[0]]);
		runSound[1] = "walk2.mp3";
		game.preload([runSound[1]]);
	
		//ジャンプ音
		var jumpSound = "jump.mp3";
		game.preload([jumpSound]);
	
		//BANANA獲得音
		var BANANAgetSound = "BANANAget.mp3";
		game.preload([BANANAgetSound]);
	
		//BANANA落ちた
		var BANANAfallSound = "BANANAfall.mp3";
		game.preload([BANANAfallSound]);
		
		//氷るSE
		var IceStartSound = "ice_se1.wav";
		game.preload([IceStartSound]);
	
		//溶けるSE
		var IceEndSound = "ice_se2.mp3";
		game.preload([IceEndSound]);
	
		var ShineSound = "shine.mp3";
		game.preload([ShineSound]);
	
		var HyunSound = "hyun.mp3";
		game.preload([HyunSound]);
	
		var PyokoSound = "pyoko.mp3";
		game.preload([PyokoSound]);
	
		//bgmトリガー画像
		var bgmtrigger = "BGMtrigger.png";
		game.preload([bgmtrigger]);
	
		//タイトルBGM
		var titleBGM = "title.mp3";
		game.preload([titleBGM]);
	
		//メインBGM
		var playBGM = "play3.mp3";
		game.preload([playBGM]);

	//音関係読み込み終わり
	//画像関係読み込み初め

	//フラグ画像
	var flagImg = "flag.png";
	game.preload([flagImg]);

	//タイトル
	var titleImg = "BANANAtitle.png";
	game.preload([titleImg]);

	//READY
	var READYImg = "READY.png";
	game.preload([READYImg]);

	//START
	var STARTImg = "START.png";
	game.preload([STARTImg]);

	//10ポイント文字
	var tenPointImg = "ten_point.png";
	game.preload([tenPointImg]);

	//枠
	var wakuImg = "waku.png";
	game.preload([wakuImg]);

	//床
	var yukaImg = "yuka.png";
	game.preload([yukaImg]);

	//背景1
	var backgroundImg = "back1.png";
	game.preload([backgroundImg]);

	//背景2
	var backgroundImg2 = "back2.png";
	game.preload([backgroundImg2]);

	//ゴリ
	var goriImg = new Array();
	goriImg[0] = "goriIdle1.png";
	game.preload([goriImg[0]]);
	goriImg[1] = "goriIdle2.png";
	game.preload([goriImg[1]]);

	//BANANA
	var BANANAImg = "BANANA.png";
	game.preload([BANANAImg]);

	//ORANGE
	var ORANGEImg = "orange.png";
	game.preload([ORANGEImg]);

	//氷
	var IceImg = "ice.png";
	game.preload([IceImg]);

	//みたらしさん
	var MitarashiImg = "mitarashi.png";
	game.preload([MitarashiImg]);

	//ゴリ飛べ
	var goriJumpImg = "gorijump.png";
	game.preload([goriJumpImg]);

	//左ボタン
	var leftbuttonImg = "leftbutton.png";
	game.preload([leftbuttonImg]);

	//右ボタン
	var rightbuttonImg = "rightbutton.png";
	game.preload([rightbuttonImg]);

	//ジャンプボタン
	var jumpbuttonImg = "jumpbutton.png";
	game.preload([jumpbuttonImg]);

	//リトライボタン
	var B_Retry = "Retry.png";					//game.htmlからの相対パス
	game.preload([B_Retry]);					//データを読み込んでおく

	//ツイートボタン
	var B_Tweet = "Tweet.png";					//game.htmlからの相対パス
	game.preload([B_Tweet]);					//データを読み込んでおく
	
	//ノーマルボタン
	var normalButtonImg = "normal_mode.png";
	game.preload([normalButtonImg]);

	//90秒チャレンジボタン
	var sixtyButtonImg = "sixty_mode.png";
	game.preload([sixtyButtonImg]);

	//読み込み終わり
	/////////////////////////////////////////////////
	

	game.onload = function () {					//ロードが終わった後にこの関数が呼び出される

		/////////////////////////////////////////////////
		//グローバル変数 

		var Point = 0;									//ポイント
		var time_text = 60;								//90秒チャレンジの秒数
		var State = 0;									//現在のゲーム状態
		var Mode = 0;									//ゲームモード
		//グローバル変数終わり
		/////////////////////////////////////////////////
		
		//BANANA最大値最小値
		var max_x = 450;
		var min_x = 18;
		
		var S_MAIN = new Scene();					//シーン作成
		game.pushScene(S_MAIN);  					//S_MAINシーンオブジェクトを画面に設置
		S_MAIN.backgroundColor = "black"; 			//S_MAINシーンの背景は黒くした

		//背景
		var back_ground = new Sprite(500, 400); 
		back_ground.moveTo(2000, -2000);
		back_ground.scale(1, 0.9);
		back_ground.image = game.assets[backgroundImg];
		
		//床
		var back_yuka = new Sprite(500, 24);
		back_yuka.moveTo(2000, 2000);
		back_yuka.scale(1, 1);
		back_yuka.image = game.assets[yukaImg];
		
		//ポイント表示テキスト
		var S_Text = new Label(); 					//テキストはLabelクラス
		S_Text.font = "20px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		S_Text.color = 'rgba(0,0,0,1)';				//色　RGB+透明度　今回は白
		S_Text.width =500;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		S_Text.moveTo(350, 337);					//移動位置指定
		
		S_Text.text = "SCORE：" + Point;			//テキストに文字表示 Pointは変数なので、ここの数字が増える

		//タイム表示テキスト
		var T_text = new Label(); 					//テキストはLabelクラス
		T_text.font = "32px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		T_text.color = 'rgba(255,255,255,1)';		//色　RGB+透明度　今回は白
		T_text.width =500;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		T_text.moveTo(235, 30);						//移動位置指定
		
		T_text.text = time_text;					//テキストに文字表示 Pointは変数なので、ここの数字が増える

		//BANANA
		var BANANA = new Sprite(24, 24);
		BANANA.moveTo(250, -50);
		BANANA.image = game.assets[BANANAImg];
		
		//ORANGE
		var ORANGE = new Sprite(32, 31);
		ORANGE.moveTo(250, -50);
		ORANGE.image = game.assets[ORANGEImg];
		
		//MITARASHI
		var MITARASHI = new Sprite(64, 64);
		MITARASHI.moveTo(550, 10);
		MITARASHI.scale(0.75, 0.75);
		MITARASHI.image = game.assets[MitarashiImg];

		//90秒BANANA設定
		var ninetyBANANA = new Array(10);
		var ninetyBANANA_moveflag = new Array(10);
		var ninetyBANANA_speed = new Array(10);
		//地面座標
		var grand_y = 303;

		//ゴリ
		var gori = new Sprite(32, 32);
		gori.moveTo(2500, grand_y);
		gori.image = game.assets[goriImg[0]];
		
		//氷
		var ice = new Sprite(48,48);
		ice.moveTo(2000, 2000);
		ice.image = game.assets[IceImg];

		//START
		var START = new Sprite(500, 400);
		START.moveTo(-3, -5);
		START.scale(1.25, 1.25);
		START.image = game.assets[STARTImg];
		
		//READY
		var READY = new Sprite(500, 400);
		READY.moveTo(-3, -5);
		READY.scale(1.25, 1.25);
		READY.image = game.assets[READYImg];
		
		//ノーマルボタン
		var mode_normal_button = new Sprite(330, 170);
		mode_normal_button.moveTo(-20, 180);
		mode_normal_button.scale(0.4, 0.4);
		mode_normal_button.image = game.assets[normalButtonImg];

		//90秒ボタン
		var mode_ninety_button = new Sprite(330, 170);
		mode_ninety_button.moveTo(170, 180);
		mode_ninety_button.scale(0.4, 0.4);
		mode_ninety_button.image = game.assets[sixtyButtonImg];

		//準備
		//function readyInit() {
			S_MAIN.addChild(back_ground);
			S_MAIN.addChild(back_yuka);
			S_MAIN.addChild(S_Text);
			S_MAIN.addChild(BANANA);
			S_MAIN.addChild(ORANGE);
			S_MAIN.addChild(MITARASHI);
			for (var i = 0; i < 10; i++) {
				ninetyBANANA[i] = new Sprite(24, 24);
				var start_x = Math.random() * (max_x - min_x) + min_x;
				ninetyBANANA[i].moveTo(start_x, -50);
				ninetyBANANA[i].image = game.assets[BANANAImg];
				ninetyBANANA_speed[i] = 0;
				ninetyBANANA_moveflag[i] = false;
				
				S_MAIN.addChild(ninetyBANANA[i]);
			}
			ninetyBANANA[0].moveTo(250,-50);
			S_MAIN.addChild(gori);
			S_MAIN.addChild(ice);
			S_MAIN.addChild(START);		
		//}

		//10ポイント文字
		var ten_point = new Sprite(256,122);
		ten_point.moveTo(2000, 2000);
		ten_point.scale(0.35, 0.35);
		ten_point.image = game.assets[tenPointImg];
		S_MAIN.addChild(ten_point);

		//ノーマルボタンタッチ時
		mode_normal_button.ontouchend = function () {
			mode_ninety_button.moveTo(2000, 2000);
			mode_normal_button.moveTo(2000, 2000);
			game.assets[playBGM].clone().play();
			State = 2;
			Mode = 1;
			readyInit();
			S_MAIN.addChild(READY);
		}

		//90秒チャレンジボタンタッチ時
		mode_ninety_button.ontouchend = function () {
			mode_ninety_button.moveTo(2000, 2000);
			mode_normal_button.moveTo(2000, 2000);
			S_MAIN.addChild(T_text);//タイマー表示
			game.assets[playBGM].clone().play();
			State = 2;
			Mode = 2;
			readyInit();
			S_MAIN.addChild(READY);
		}

		//title
		var title = new Sprite(500, 400);
		title.moveTo(-3, -5);
		title.scale(1.2, 1.25);
		title.image = game.assets[titleImg];
		S_MAIN.addChild(title);

		//枠
		var back_waku = new Sprite(500, 400); 
		back_waku.moveTo(-3, -14);
		back_waku.scale(1.17, 1.21);
		back_waku.image = game.assets[wakuImg];
		S_MAIN.addChild(back_waku);

		//フラグ判定画像
		var flag_spr = new Sprite(1000, 1000); 
		flag_spr.moveTo(-4, -14);
		flag_spr.scale(1, 1);
		flag_spr.image = game.assets[flagImg];
		S_MAIN.addChild(flag_spr);

		//左ボタン
		var left_button = new Sprite(64, 64);
		left_button.moveTo(40, 420);
		left_button.scale(2.0 ,2.0);
		left_button.image = game.assets[leftbuttonImg];
				
		//右ボタン
		var right_button = new Sprite(64, 64);
		right_button.moveTo(170, 420);
		right_button.scale(2.0, 2.0);
		right_button.image = game.assets[rightbuttonImg];
				
		//ジャンプボタン
		var jump_button = new Sprite(64, 64);
		jump_button.moveTo(370, 420);
		jump_button.scale(2.0, 1.8);
		jump_button.image = game.assets[jumpbuttonImg];

		//タイトル画面遷移
		flag_spr.ontouchend = function () {
			//game.assets[playBGM].clone().play();
			S_MAIN.addChild(mode_normal_button);
			S_MAIN.addChild(mode_ninety_button);
			title.moveTo(2000, 2000);
			flag_spr.moveTo(20000, 20000);
			State = 1;
		}
	
		//BANANA速度
		var BANANA_speed = 4;
		//ゴリ速度
		var gori_speed = 0;
		//移動速度
		var speed = 4.8;
		//ジャンプ速度
		var jump_speed = 0;
		//地面判定
		var grand = true;
		//重力
		var gravity = 0;
		//ゴリ向き
		var dir = 1;
		//画像カウント
		var image_count = 0;
		//背景カウント
		var back_image_count = 0;
		//準備時間
		var ready_time = 0;
		//プレイ回数
		var play_num = 0;
		//スタート時間
		var start_time = 0;
		//ゲームカウント
		var game_count = 0;
		//90BANANAカウント
		var BANANA_count = 0;
		///BANANA最高速度
		var BANANA_max_speed = 7.0;
		//BANANA最低速度
		var BANANA_min_speed = 2.5;
		//BANANA個数
		var BANANA_max_count = 100;
		//BANANAが降ってくる数
		var BANANA_sum = new Array(BANANA_max_count);
		//BANANAが降ってくる間隔を計算
		var BANANA_interval = Math.floor(1680 / BANANA_max_count);
		//BANANAが降ってくる間隔をここで求める
		for (var s = 0; s < BANANA_max_count; s++){
			BANANA_sum[s] = Math.floor((s * BANANA_interval) + Math.random() * (BANANA_interval - 1) + 1);
		}
		//降ってきたBANANAの数
		var BANANA_count_num = 0;
		//凍っているかチェック
		var ice_flag = false;
		//凍結時間
		var ice_time = 60;
		//凍結カウント
		var ice_count = 0;

		//ORANGEモード
		var ORANGE_mode = 0;
		
		//console.log(BANANA_sum);

		///////////////////////////////////////////////////
		//メインループ　
		game.onenterframe = function () {
			//地面判定チェック
			
			if (State == 0) {
				//タイトル
			}
			else if (State == 1) {
				//モード決定
			}
			else if (State == 2) {
				//Ready
				BANANA.moveTo(250, -50);
				//ORANGE.moveTo(250, 150);
				gori.moveTo(250, grand_y);
				//移動
				back_ground.moveTo(0, -5);
				back_yuka.moveTo(-1, 335);
				gori.moveTo(250, grand_y);
				back_ground.image = game.assets[backgroundImg];
					//ゴリ速度
					gori_speed = 0;
					//移動速度
					speed = 4.8;
					//ジャンプ速度
					jump_speed = 0;
					//地面判定
					grand = true;
					//重力
				gravity = 0;
				gori.image = game.assets[goriImg[0]];
				ready_time += 1;
				if (ready_time == 1) {
					if (play_num == 0) {
						S_MAIN.addChild(left_button);
						S_MAIN.addChild(right_button);
						S_MAIN.addChild(jump_button);
					}
				}
				if (ready_time == 60) {
					READY.moveTo(2000, 2000);
					
					start_time = 0;
					State = 3;
					//Mode = 2;
				}
			}
			//プレイ
			else if (State == 3) {
				
			start_time += 1;
			if (start_time == 60) {
				START.moveTo(2000, 2000);
				}
			//キー操作
					left_button.ontouchstart = function () {
						if (start_time > 60) {
							if (ice_flag == false) {
								gori_speed = -speed;
								game.assets[runSound[0]].clone().play();
								if (dir == -1) {
									gori.scale(-1, 1);
									dir = 1;
								}
							}
						}
					}
				
					left_button.ontouchend = function () {
						gori_speed = 0;
						
					}
					right_button.ontouchstart = function () {
						if (start_time > 60) {
							if (ice_flag == false) {
								gori_speed = speed;
								game.assets[runSound[0]].clone().play();
								if (dir == 1) {
									gori.scale(-1, 1);
									dir = -1;
								}
							}
						}
					}
					right_button.ontouchend = function () {
						gori_speed = 0;
						
					}
				jump_button.ontouchstart = function () {
						if (start_time > 60) {
							if (grand == true) {
								jump_speed = -8;
								game.assets[jumpSound].clone().play();
								grand = false;
							}
						}
					}
				
				if (ice_flag == false) {
						//ゴリ速度適用
					gori.x += gori_speed;
					gori.y += jump_speed;
				} else {
					jump_speed = 0;
					}
					
				
					//ゴリの限界
					if (gori.x < min_x) {
						gori.x = min_x;
					}
					if (gori.x > max_x) {
						gori.x = max_x;
					}
				
			//移動時のアニメーションとSE
			if (gori_speed != 0 && gori.y > grand_y - 2) {
				image_count += 1;
				if (image_count == 5) {
					gori.image = game.assets[goriImg[0]];
					game.assets[runSound[1]].clone().play();	
				}
				if (image_count == 10) {
					gori.image = game.assets[goriImg[1]];
					game.assets[runSound[0]].clone().play();	
					image_count = 0;
				}
			} else {
				image_count = 0;
			}
				if (start_time > 60) {
					if (Mode == 1) {
						normalMode();
					}
					if (Mode == 2) {
						ninetyMode();
					}
				}
			
			
			}
			else if (State == 4) {
				//リザルト
				//速度0
				gori_speed = 0;
				start_time = 0;
				speed = 0;
				jump_speed = 0;
				gravity = 0;
				back_image_count += 1;
				
				if (back_image_count % 10 == 0) {
					back_ground.image = game.assets[backgroundImg];
				}
				if (back_image_count % 20 == 0) {
					back_ground.image = game.assets[backgroundImg2];
				}
				if (back_image_count == 69) {
					State = 5;
				}

				if (ice_flag == true){
					ice_count++;
					if (ice_count == ice_time) {
						ice_flag = false;
						game.assets[IceEndSound].clone().play();
						ice.moveTo(2000, 2000);
					}
				}
				
			} else if (State == 5) {
				gori_speed = 0;
				speed = 0;
				jump_speed = 0;
				gravity = 0;
				game.popScene();					//S_MAINシーンを外す
				game.pushScene(S_END);				//S_ENDシーンを読み込ませる
				S_GameOverText.text = "GAMEOVER 記録：" + Point + "房";				//テキストに文字表示 
			}
		
			//現在のテキスト表示
			S_Text.text = "SCORE：" + Point; 				//Point変数が変化するので、毎フレームごとにPointの値を読み込んだ文章を表示する

		};
		//ノーマルモード
		function normalMode(){
			
			//ジャンプ判定
			if (gori.y >= grand_y) {
				gori.y = grand_y;
				jump_speed = 0;
				gravity = 0;
				gori.image = game.assets[goriImg[0]];
				grand = true;
			} else {
				gravity += 0.3;
				gori.image = game.assets[goriJumpImg];
				jump_speed += gravity;
				var direction_x = Math.abs(gori.x - BANANA.x);
				var direction_y = Math.abs(gori.y - BANANA.y);
				var direction = Math.sqrt(direction_x * direction_x + direction_y * direction_y);
				if (direction < 25) {
					var next_x = Math.random() * (max_x - min_x) + min_x;
					BANANA.x = next_x;
					BANANA.y = -100;
					game.assets[BANANAgetSound].clone().play();	
					Point += 1;
				}
			}
			BANANA.y += BANANA_speed + (Point / 20);
			if (BANANA.y > grand_y) {
				game.assets[BANANAfallSound].clone().play();
				start_time = 0;
				State = 4;
				//ゲームオーバー後のテキスト表示
			}
		}
		//90秒モード
		function ninetyMode() {

			//ゲームカウント
			game_count++;
			//BANANAが降ってくるタイミング
			//90秒は2700フレーム
			//2700を120個に分ける
			if (game_count % 30 == 0) {
				time_text -= 1;
				T_text.text = time_text;
				if (time_text == 20) {
					T_text.color = 'rgba(200,0,0,1)';
				}
			}
			if (game_count == 1800) {
				game.assets[BANANAfallSound].clone().play();
				State = 4;
			}

			//MITARASHI動き
			MITARASHIMove();

			//ORANGEの動き関連
			ORANGEMove();
			
			if (game_count == BANANA_sum[BANANA_count_num]) {
				//お前動いてるぞと知らせるフラグ
				ninetyBANANA_moveflag[BANANA_count] = true;
				ninetyBANANA_speed[BANANA_count] = Math.random() * (BANANA_max_speed - BANANA_min_speed) + BANANA_min_speed;
				//増えろ
				BANANA_count++;
				BANANA_count_num++;
				//10個以上は出ないのよ(はぁと)
				if (BANANA_count >= 10) {
					BANANA_count = 0;
				}
			}
			//お前動いてるぞと知らされたフラグのBANANAを動かせる処理
			for (var i = 0; i < 10; i++){
				if (ninetyBANANA_moveflag[i] == true) {
					ninetyBANANA[i].y += ninetyBANANA_speed[i];
				}
				if (ninetyBANANA[i].y > grand_y) {
					ninetyBANANA_moveflag[i] = false;
					var next_x = Math.random() * (max_x - min_x) + min_x;
					ninetyBANANA[i].moveTo(next_x, -50);
				}
				
			}

			//ジャンプ判定
			if (gori.y >= grand_y) {
				gori.y = grand_y;
				jump_speed = 0;
				gravity = 0;
				gori.image = game.assets[goriImg[0]];
				grand = true;
			} else {
				if (ice_flag == false) {
					gravity += 0.3;
					}
					gori.image = game.assets[goriJumpImg];
					jump_speed += gravity;
					//BANANA取得判定
					for (var j = 0; j < 10; j++) {
						if (ninetyBANANA_moveflag[j] == true) {
							var direction_x = Math.abs(gori.x - ninetyBANANA[j].x);
							var direction_y = Math.abs(gori.y - ninetyBANANA[j].y);
							var direction = Math.sqrt(direction_x * direction_x + direction_y * direction_y);
							if (direction < 25 && ice_flag == false) {
								var next_x = Math.random() * (max_x - min_x) + min_x;
								ninetyBANANA[j].x = next_x;
								ninetyBANANA[j].y = -100;
								ninetyBANANA_moveflag[j] = false;
								game.assets[BANANAgetSound].clone().play();
								Point += 1;
							}

						}
					}
				//ORANGE取得判定
				var orange_direction_x = Math.abs(gori.x - ORANGE.x);
				var orange_direction_y = Math.abs(gori.y - ORANGE.y);
				var orange_direction = Math.sqrt(orange_direction_x * orange_direction_x + orange_direction_y * orange_direction_y);
				if (orange_direction < 25 && ice_flag == false) {
					ORANGE_mode = 0;
					ice.moveTo(gori.x - 6, gori.y - 6);
					ice_count = 0;
					game.assets[IceStartSound].clone().play();
					ice_flag = true;
					
				}
				//MITARASHI取得判定
				var MITARASHI_direction_x = Math.abs(gori.x - MITARASHI.x);
				var MITARASHI_direction_y = Math.abs(gori.y - MITARASHI.y);
				var MITARASHI_direction = Math.sqrt(MITARASHI_direction_x * MITARASHI_direction_x + MITARASHI_direction_y * MITARASHI_direction_y);
				if (MITARASHI_direction < 35 && ice_flag == false) {
					Point += 10;
					ten_point.moveTo(gori.x - 100, gori.y - 60);
					game.assets[BANANAgetSound].clone().play();
					MITARASHI_count = 0;
					MITARASHI_flag = -1;
					
				}
			}
			//凍結タイム
			if (ice_flag == true){
				ice_count++;
				if (ice_count == ice_time) {
					ice_flag = false;
					game.assets[IceEndSound].clone().play();
					ice.moveTo(2000, 2000);
				}
			}

		}

		var random_dir = Math.floor(Math.random() * 2);
		//ORANGEスピード
		var orange_speed = 3;
		//ORANGE管理
		var orange_mode_count = 0;
		var orange_gravity = 0;
		var orange_jump_speed = 0;
		var orange_jump_high = 10;
		var orange_next_count = 60;
		var orange_dir = 0;
		//ホーミング用変数
		var orange_start_x = 0;
		var orange_start_y = 0;
		var orange_end_x = 0;
		var orange_end_y = 0;
		var orange_middle_x = 0;
		var orange_middle_y = 0;
		var orange_time = 0;

		//ゆらゆら用変数
		var yura_x = 0;
		var yura_size = 50;
		var yura_speed = 5;
		
		function ORANGEMove() {
			switch (ORANGE_mode) {
				//待機
				
				case 0:
					ORANGE.x = 250;
					ORANGE.y = -30;
					orange_mode_count = 0;
					orange_speed = 0;
					orange_jump_speed = 0;
					orange_gravity = 0;
					orange_next_count = Math.floor(RandomRange(10, 40));
					ORANGE_mode = 1;
					break;
				case 1:
					orange_mode_count++;
					if (orange_next_count == orange_mode_count) {
						if (game_count < 1700) {
							ORANGE_mode = Math.floor(RandomRange(2,6));
							//ORANGE_mode = 5;
							orange_mode_count = 0;
						}
						
					}
					break;
				//落下
				case 2:
					orange_mode_count++;
					if (orange_mode_count == 1) {
						var next_x = gori.x;
						ORANGE.x = next_x;
					}
					orange_gravity += 0.01;
					orange_jump_speed += orange_gravity;
					ORANGE.y += orange_jump_speed;
					if (ORANGE.y > grand_y - orange_jump_speed - 1) {
						ORANGE_mode = 0;
					}
					break;
				//横からぽんぽん
				case 3:
					orange_mode_count++;
					if (orange_mode_count == 1) {
						var orange_direction = Choose("左", "右");
						if (orange_direction == "左") {
							ORANGE.x = -50;	
							orange_speed = 3;
							orange_dir = -1;
						}
						if (orange_direction == "右") {
							ORANGE.x = 550;
							orange_speed = -3;
							orange_dir = 1;
						}
						ORANGE.y = grand_y - 20;
						orange_jump_speed = -orange_jump_high;
						orange_speed = 8 + orange_jump_speed / 2;
					}
					if (orange_mode_count > 1) {
						orange_gravity += 0.05;
						orange_jump_speed += orange_gravity;
						ORANGE.x += orange_speed;
						ORANGE.y += orange_jump_speed;
						if (ORANGE.y > grand_y) {
							ORANGE.y = grand_y;
							orange_jump_speed = -RandomRange(2, orange_jump_high);
							orange_speed = 8 + orange_jump_speed / 2;
							orange_gravity = 0;
						}
						if (ORANGE.x < -100 || ORANGE.x > 600) {
							ORANGE_mode = 0;
						}

					}
					break;
				//ホーミング
				case 4:
					orange_mode_count++;
					
					if (orange_mode_count == 1) {
						ORANGE.x = RandomRange(min_x, max_x);
						ORANGE.y = -50;
						orange_start_x = ORANGE.x;
						orange_start_y = ORANGE.y;
						orange_middle_x = RandomRange(min_x - 500, max_x + 500);
						orange_middle_y = RandomRange(50, 250);
						orange_end_x = gori.x;
						orange_end_y = grand_y - 30;
						orange_time = 0;
					}
					if (orange_mode_count > 1) {
						orange_time += 0.02;
						var a = 1 - orange_time;
						var b = orange_time * orange_middle_x;
						var c = orange_time * orange_time;
						var d = orange_time * orange_middle_y;
						ORANGE.x = ((a * a) * orange_start_x) + (2 * a * b) + (c * orange_end_x);
						ORANGE.y = ((a * a) * orange_start_y) + (2 * a * d) + (c * orange_end_y);
						if (orange_time > 2 || ORANGE.y > grand_y - 10) {
							ORANGE_mode = 0;
						}
					}
					break;
				//ゆらゆらー
				case 5:
					orange_mode_count++;

					if (orange_mode_count == 1) {
						yura_x = RandomRange(min_x + 50, max_x - 50);
						ORANGE.y = -50;
						orange_speed = RandomRange(3, 6);
						yura_size = RandomRange(50, 80);
						yura_speed = RandomRange(6, 10);
					}
					if (orange_mode_count > 1) {
						ORANGE.y += orange_speed;
						ORANGE.x = yura_x + (Math.sin(2 * Math.PI / 300 * orange_mode_count * yura_speed) * yura_size);
						if (ORANGE.y > grand_y) {
							ORANGE_mode = 0;
						}
					}
					break;
				default:
					console.log("ハゲカス");
			}
			

		}
		//MITARASHI出現タイミングを決める
		var MITARASHI_time = Math.floor(RandomRange(600, 1200));
		//MITARASHI落下タイミングも決める
		var MITARASHI_fall_time = Math.floor(RandomRange(30, 300));
		//MITARASHI管理カウント
		var MITARASHI_count = 0;

		var MITARASHI_flag = 0;
		var MITARASHI_dir = -1;
		var MITARASHI_speed = 7;
		var MITARASHI_gravity = 0;
		var MITARASHI_fall_speed = 0;
		function MITARASHIMove() {
			if (game_count == MITARASHI_time && MITARASHI_flag == 0) {
				game.assets[ShineSound].clone().play();
				MITARASHI_flag = 1;
			}
			if (MITARASHI_flag >= 1) {
				MITARASHI_count++;
				MITARASHI.x += MITARASHI_speed * MITARASHI_dir;
				if (MITARASHI_count > 30) {
					if (MITARASHI.x < min_x) {
						MITARASHI_dir = 1;
					}
					if (MITARASHI.x > max_x - 20) {
						MITARASHI_dir = -1;
					}
				}
			}
			if (MITARASHI_flag == 1) {
				
				if (MITARASHI_count % 10 == 0) {
					game.assets[PyokoSound].clone().play();
				}

				if (MITARASHI_count == MITARASHI_fall_time) {
					game.assets[HyunSound].clone().play();
					MITARASHI_flag = 2;
				}
			}
			if (MITARASHI_flag == 2) {
				MITARASHI_gravity += 0.02;
				MITARASHI_fall_speed += MITARASHI_gravity;
				MITARASHI.y += MITARASHI_fall_speed;
				if (MITARASHI.y > grand_y) {
				
					MITARASHI_flag = -1;
					MITARASHI_count = 0;
				}
			}
			if (MITARASHI_flag == -1) {
				MITARASHI.x = 550;
				MITARASHI.y = 10;
				MITARASHI_count++;
				if (MITARASHI_count == 60) {
					ten_point.moveTo(2000, 2000);
				}
			}
		}
		//2つから一つをランダムに選ぶ
		function Choose(a,b) {
			var random_dir = Math.floor(Math.random() * 2);
			if (random_dir == 0 || random_dir == 2) {
				return a;
			}
			if (random_dir == 1) {
				return b;
			}
			return "Error";
		}

		//ランダム範囲指定
		function RandomRange(rand_min, rand_Max) {
			var random_range = Math.random() * (rand_Max - rand_min) + rand_min;
			return random_range;
		}
		////////////////////////////////////////////////////////////////
		//結果画面
		S_END = new Scene();
		S_END.backgroundColor = "red";

		//GAMEOVER
		var S_GameOverText = new Label(); 					//テキストはLabelクラス
		S_GameOverText.font = "bold 36px Meiryo";				//フォントはメイリオ 20px 変えたかったらググってくれ
		S_GameOverText.color = 'rgba(255,255,255,1)';		//色　RGB+透明度　今回は白
		S_GameOverText.width = 500;							//横幅指定　今回画面サイズ400pxなので、width:400pxだと折り返して二行目表示してくれる
		S_GameOverText.moveTo(20, 150);						//移動位置指定
		S_END.addChild(S_GameOverText);						//S_ENDシーンにこの画像を埋め込む

		//リトライボタン
		var S_Retry = new Sprite(120, 61);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		S_Retry.moveTo(100, 300);						//リトライボタンの位置
		S_Retry.scale(1.2, 1.2);
		S_Retry.image = game.assets[B_Retry];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		S_END.addChild(S_Retry);						//S_ENDにこのリトライボタン画像を貼り付ける  

		S_Retry.ontouchend = function () {				//S_Retryボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			State = 2;
			READY.moveTo(-3, -5);
			START.moveTo(-3, -5);
			Point = 0;
			ready_time = 0;
			start_time = 0;
			back_image_count = 0;
			play_num += 1;
			time_text = 60;
			game_count = 0;
			BANANA_count = 0;
			BANANA_count_num = 0;
			ORANGE_mode = 0;
			MITARASHI_flag = 0;
			MITARASHI_dir = -1;
			MITARASHI_gravity = 0;
			MITARASHI_fall_speed = 0;
			MITARASHI_time = Math.floor(RandomRange(600, 1200));
			MITARASHI_fall_time = Math.floor(RandomRange(30, 300));
			MITARASHI_count = 0;
			T_text.text = time_text;	
			T_text.color = 'rgba(255,255,255,1)';
			for (var s = 0; s < BANANA_max_count; s++){
				BANANA_sum[s] = Math.floor((s * BANANA_interval) + Math.random() * (BANANA_interval - 0) + 0);
			}
			game.popScene();						//S_ENDシーンを外す
			game.pushScene(S_MAIN);					//S_MAINシーンを入れる
		};
		
		//ツイートボタン
		var S_Tweet = new Sprite(120, 62);				//画像サイズをここに書く。使う予定の画像サイズはプロパティで見ておくこと
		S_Tweet.moveTo(280, 300);						//リトライボタンの位置
		S_Tweet.scale(1.2, 1.2);
		S_Tweet.image = game.assets[B_Tweet];			//読み込む画像の相対パスを指定。　事前にgame.preloadしてないと呼び出せない
		S_END.addChild(S_Tweet);						//S_ENDにこのリトライボタン画像を貼り付ける  

		var mode_text = "ノーマルモード";

		S_Tweet.ontouchend = function () {				//S_Tweetボタンをタッチした（タッチして離した）時にこの中の内容を実行する
			//ツイートＡＰＩに送信
			// + "%0d製作者1" + orange_url + "%0d製作者2" + Syka_url
			//
			if (Mode == 2) {
				mode_text = "60秒チャレンジ";
			}
			window.open("http://twitter.com/intent/tweet?text=【" + mode_text + "】%0dBANANAを" + Point + "房食べた%0dみんなもゴリろう!!%0dゲームURL" + url + "%0d&hashtags=BANANA %0d ver.2.01"); //ハッシュタグ
		};

		
	};
	game.start();
	
};
