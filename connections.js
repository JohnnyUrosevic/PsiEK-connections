class Member {
  constructor(name, bigs, littles) {
    this.name = name;
    this.bigs = bigs;
    this.littles = littles;
    this.connections = bigs.concat(littles);
  }

  isConnectedTo(member2) {
    return this.connections.includes(member2.name);
  }
}

var members = {};
members["Kyle Reidy"] = new Member("Kyle Reidy",
                                   ["Jareni Polanco", "Noah Ashman"],
                                   ["Siobhan Chapman", "Renu Chepuru", "Justin Ward", "Katy Rucker", "Willis Lam"]);
members["Katy Rucker"] = new Member("Katy Rucker",
                                   ["Kyle Reidy", "Matthew Espinoza"],
                                   []);
members["Matthew Espinoza"] = new Member("Matthew Espinoza",
                                   ["Katie Osborn", "Kelly Vines"],
                                   ["Katy Rucker", "Sophia Buraglio"]);

var path = [];

function connect(member1, member2) {
  path.push(member1);

  // base case
  if (member1.isConnectedTo(member2)) {
    path.push(member2);
    return true;
  }

  // recursive case
  for (const name of member1.connections) {
    if (members[name] == undefined)
      continue;

    member = members[name];

    if (connect(member, member2)) {
      return true;
    }
  }

  path.pop();
  return false;
}

function prettyFormat() {
  console.log(path);
  var fullString = path[0].name;
  console.log(path.slice(1));
  for (const member of path.slice(1)) {
    console.log(member);
    fullString += " -> " + member.name
  }
  return fullString;
}

// main
connect(members["Kyle Reidy"], members["Matthew Espinoza"]);
console.log(prettyFormat());
