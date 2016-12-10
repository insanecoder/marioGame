//collision quadtrees

const MAX_QUADTREE_LEVEL =5;
const MAX_QUADTREE_OBJECTS= 10;

// Game obbject Types
const TYPE_PLAYER= 'player';
const TYPE_DRAGON= 'dragon';
const TYPE_MISSILES= 'missile';
const TYPE_DUCKS= 'duck';

// player constants
const PLAYER_XVELOCITY=7;
const PLAYER_YVELOCITY=25;
const GRAVITY_STAGE =5;
const PLAYER_XPOS =10;
const PLAYER_YPOS =100;
const PLAYER_IMAGE="mario1";

// missile constant
const MISSILE_XVELOCITY=10;
const MISSILE_GRAVITY=0.1;
const TIME_MISSILES =7000;
const MISSILE_IMAGE= 'missile';

// duck constants
const DUCK_VELOCITY= 10;
const DUCK_XPOS=500;
const DUCK_YPOS=0;
const DUCK_IMAGE="duck1";
const TIME_MIN_DUCKS= 3000;
const TIME_MAX_DUCKS= 8000;

// dragon constants
const DRAGON_YVELOCITY=10;
const DRAGON_GRAVITY=1;
const DRAGON_XPOS=570;
const DRAGON_YPOS=100;
const DRAGON_IMAGE=["dragon2","dragon1"];
const DRAGON_ENERGY =2;
const DRAGON_HIT_MESSAGE ='You hit the dragon';

// game status
const GAME_PAUSE= 'Resume';
const GAME_RUNNING = 1;
const GAME_OVER = 'Game Over';
const GAME_WON = 'You Won the Game';

//canvas
const CANVAS_ID= 'myCanvas';
const BUFFER_COLLISION =1;

//wall
const WALL_OBJS={};//{'wall1':{'x':100,'y':100,'img':'wall1'},'wall2':{'x':400,'y':100,'img':'wall1'}};
