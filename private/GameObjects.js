//SERVER - GAME OBJECTS

//Constructor for a Point
function Point(x, y) {
    //properties
    this.x = x;
    this.y = y;

    //Gets or sets the coordinates of the point
    this.coords = function (xy) {
        if (xy) {
            this.x = xy.x;
            this.y = xy.y;
        } else {
            return { x: this.x, y: this.y };
        }
    };

    this.equals = function (xy) {
        if (xy.x == this.x && xy.y == this.y) {
            return true;
        } else {
            return false;
        }
    }
}

//Constructor for a Key
function Key() {
    this.keyColor = '';
    this.keyName = '';

    this.color = function (c) {
        if (c) {
            this.keyColor = c;
        } else {
            return this.keyColor;
        }
    }

    this.name = function (n) {
        if (n) {
            this.keyName = n;
        } else {
            return this.keyName;
        }
    }

    this.equals = function (key) {
        if (typeof (key) === 'object' && key.hasOwnProperty('keyColor') && keyColor.hasOwnProperty('keyName')){
            if (this.keyColor === key.keyColor && this.keyName === key.keyName) {
                return true;
            }
        }
        return false;
    }
}

//Constructor for a Door
function Door() {
    this.locked = false;
    this.lock = function (l) {
        if (l) {
            this.locked = true;
        } else {
            this.locked = false;
        }
    }
    //list of key indexs that will lock/unlock this door
    this.keys = [];
}

//Constructor for an Item
function Item(text) {
    this.description = '';
    if (typeof (text) === 'string') {
        description = text;
    }
}

//Constructor for a Room
function Room(point) {
    this.point = point;
    this.description = '';
    this.roomName = '';
    this.roomOwner = '';
    // 0 = North, 1 = South, 2 = East, 3 = West
    this.doors = [new Door(), new Door(), new Door(), new Door()];

    //getter/setter for room description
    this.desc = function (text) {
        if (text) {
            this.description = text;
        } else {
            return this.description;
        }
    }

    //getter/setter for owner
    this.owner = function (newOwner) {
        if (newOwner) {
            this.roomOwner = newOwner;
        } else {
            return this.roomOwner;
        }
    }

    //getter/setter for room name
    this.name = function (newName) {
        if (newName) {
            this.roomName = newName;
        } else {
            return this.roomName;
        }
    }

    //returns a single door
    this.door = function (i) {
        if (i === 0 || (typeof (i) === 'string' && i.toUpperCase() === 'N')) {
            return this.doors[0];
        } else if (i === 1 || (typeof (i) === 'string' && i.toUpperCase() === 'S')) {
            return this.doors[1];
        } else if (i === 2 || (typeof (i) === 'string' && i.toUpperCase() === 'E')) {
            return this.doors[2];
        } else if (i === 3 || (typeof (i) === 'string' && i.toUpperCase() === 'W')) {
            return this.doors[3];
        }
    }
}

//Constructor for a Player
function Player(username) {
    this.username = username;
    this.keys = [];
    this.mode = 'CMD';
    //modes: CMD, T, W, G

    //accepts a string of username or a user object and returns if it matches
    this.equals = function (u) {
        if (typeof(u) === 'string' && u === username) {
            return true;
        } else if (typeof (u) === 'object' && u.hasOwnProperty('username') && u.username === this.username) {
            return true;
        }
        return false;
    }

    //store the index of the key for the list
    this.addKey = function(keyIndex){
        keys.push(keyIndex);
    }
}

//Constructor for a game world holds the rooms, keys, and players
function World() {
    this.rooms = [];
    this.keys = [];
    this.players = [];

    this.addRoom = function(p) {
        if (this.getRoom(p)) {
            return;
        }
        var room = new Room(p);
        this.rooms.push(room);
        return room;
    }

    this.getRoom = function(p) {
        var room = false;
        for(var i = 0; i < this.rooms.length; i++){
            if (this.rooms[i].point.equals(p)) {
                room = this.rooms[i];
            }
        }
        return room;
    }

    this.addPlayer = function (u) {
        var newPlayer = new Player(u);
        if(this.getPlayer(newPlayer)){
            return;
        }
        this.players.push(newPlayer);
        return true;
    }

    this.removePlayer = function (u) {
        var indexToRemove = -1;
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].equals(u)){
                indexToRemove = i;
            }
        }
        this.players.splice(indexToRemove, 1);
    }

    this.getPlayer = function(p){
        for(var i = 0; i < this.players.length; i++){
            if(this.players[i].equals(p)){
                return this.players[i];
            }
        }
        return false;
    }
}

module.exports = {
    Point: Point,
    Key: Key,
    Door: Door,
    Item: Item,
    Player: Player,
    Room: Room,
    World: World
};