// Original-Datenpunkt
const idOrigin = 'hm-rpc.0.XEQ1234567.1.STATE';
 
// Alias-Datenpunkt
const idAlias = 'Wohnen.Licht.Deckenlampe';
var typeAlias, read, write, nameAlias, role, desc, min, max, unit, states, custom, raum, gewerk;
// Folgende kommentieren, wenn keine Änderung der Eigenschaft erforderlich
nameAlias = 'Deckenlicht';
desc = 'per Script erstellt';
// typeAlias = 'boolean'; // oder 'number'
// read = "val < 20 ? true : false"; // Erkennung "Aus" --> false erfolgt automatisch  
// write = "val ? 'Ein' : 'Aus'";
// role = 'indicator';
// min = 0; // nur Zahlen
// max = 100; // nur Zahlen
// unit = '%'; // nur für Zahlen
// states = {0: 'Aus', 1: 'Auto', 2: 'Ein'}; // Zahlen (Multistate) oder Logikwert (z.B. Aus/Ein)
// custom = []; // verhindert doppelte Ausführung von history, ...
// raum = 'EG_Flur'; // Groß-/Kleinschreibung in der ID beachten !
// gewerk = 'Licht'; // Groß-/Kleinschreibung in der ID beachten !

function createAlias(idSrc, idDst) {
   if(existsState(idDst)) log(idDst + ' schon vorhanden !', 'warn');
   else {
      var obj = {};
      obj.type = 'state';
      obj.common = getObject(idSrc).common;
      obj.common.alias = {};
      obj.common.alias.id = idSrc;
      if(typeAlias) obj.common.type = typeAlias;
      if(obj.common.read !== false && read) obj.common.alias.read = read;
      if(obj.common.write !== false && write) obj.common.alias.write = write;
      if(nameAlias) obj.common.name = nameAlias;
      if(role) obj.common.role = role;
      if(desc) obj.common.desc = desc;
      if(min !== undefined) obj.common.min = min;
      if(max !== undefined) obj.common.max = max;
      if(unit) obj.common.unit = unit;
      if(states) obj.common.states = states;
      if(custom && obj.common.custom) obj.common.custom = custom;
      obj.native = {};
      setObject(idDst, obj);
      if(raum && getObject('enum.rooms.' + raum)) {
         let obj = getObject('enum.rooms.' + raum)
         obj.common.members.push(idDst);
         setObject('enum.rooms.' + raum, obj);
      }
      if(gewerk && getObject('enum.functions.' + gewerk)) {
         let obj = getObject('enum.functions.' + gewerk)
         obj.common.members.push(idDst);
         setObject('enum.functions.' + gewerk, obj);
      }
   } 
}
 
createAlias(idOrigin, 'alias.0.' + idAlias);
