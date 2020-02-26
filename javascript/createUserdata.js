// Datenpunkt unter 0_userdata.0 erstellen
const idUser = 'Muell.gelbeTonne.Abholdatum';
const commonUser = { // nicht benötigte Attribute auskommentieren
    type: 'string', 
    read: true, 
    write: true, 
    name: 'Abholung gelbe Tonne',
//    desc: 'Laufzeit Rollo', 
    def: '22.11.2019',
//    min: 0,     // nur bei Zahlen
//    max: 30,   // nur bei Zahlen
//    unit: 'Tage',  // nur bei Zahlen
//    states: { // nur bei Zahlen oder Logikwerten
//        0: 'Aus',
//        1: 'Auto',
//        2: 'Ein'
//    },
    role: 'text'
};

function createDp(id, common) {
    if($(id).length) log('Datenpunkt ' + id + ' existiert bereits !', 'warn');
    else {
        var obj = {};
        obj.type = 'state';
        obj.common = common;
        setObject(id, obj, function (err) {
            if (err) log('Cannot write object: ' + err)
            else {
                var init = null;
                if(common.def === undefined) {
                    if(common.type === 'number') init = 0;
                    if(common.type === 'boolean') init = false;
                    if(common.type === 'string') init = '';
                } else init = common.def;
                setState(id, init, true);
            }
        });
    }
}

createDp('0_userdata.0.' + idUser, commonUser);
