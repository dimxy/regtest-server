var fs = require('fs');

try {
  var level = require('leveldown');
} catch(e) {
  console.error("You must have the node module `level` installed.");
  console.error("To install run: `npm install level`");
  process.exit(1);
}

if(process.argv.length !== 3) {
  console.error("Usage: leveldump <path_to_db>");
  process.exit(1)
}
let MIN64 = '0000000000000000000000000000000000000000000000000000000000000000'
         //  74b4ef2e3f463446975cb0d7290360286d85361614c3d21819230ff38aa00c7b
console.log('process.argv[2]=', process.argv[2])
let db = level(process.argv[2])

var dbPath = process.argv[2];
db.open({}, async (err) => {
    if (err) return console.log(err)
    //i = db.iterator({gte: { scId: MIN64, height: 0, txId: MIN64, vout: 0 }})
    //i = db.iterator({limit: 10})
    
    let b = Buffer.alloc(1)
    b[0] = 0x81
    //for (i = 1; i < 72; i++)
    //    b[i] = 0;
    var it = db.iterator({ 
        gte : Buffer.from([0x33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]),   
        lte : Buffer.from([0x33,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255,255])
    })
    /*'83000003e8ff040000'*/
    //i.seek('330000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
    //it.seek(b)

    console.log('stats=', db.getProperty('leveldb.sstables'))


    //it.seek(Buffer.from([0x83, 00, 00, 0x03, 0xe8, 0xff, 0x04, 00, 00]))
    //it.seek('83000003e8ff040000')

    //console.log('loop... i.key=', i.key)
    //it.next( ()=>console.log('enterred') )
    it.next(function p(err, key, value)  {
        console.log('next enterred')
        console.log('err=', err, 'key=', key, 'value=', value)
        if (typeof err === 'undefined' ) {
            it.end((err)=>console.log('it ended, err=', err))
            return
        }
        //else
        it.next(p)
    })
    //console.log('stats=', db.getProperty('leveldb.sstables'))

    //console.log('it=', it)
        


});

/*try {
var stats = fs.statSync(dbPath);
} catch(e) {
  console.error("No such leveldb database");
  process.exit(1)  
}

if(!stats.isDirectory()) {
  console.error("No such leveldb database");
  process.exit(1)  
}

try {
  var db = level(dbPath, {valueEncoding: 'json'});
} catch(e) {
  console.error("Could not open leveldb database");
  process.exit(1)  
}

s = db.createReadStream();

s.on('data', function(data) {
  console.log(data.key, data.value);
})*/