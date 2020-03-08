class GenAlg {
    constructor() {
        this.cities = []
        this.performance ={"x":[],"y":[]}
        this.genobj = {}
        this.genobj["OldGen"] = {}
        this.genobj["OldGen"]["Pop"] = []
        this.genobj["OldGen"]["BestFit"] = 9999
        this.genobj["OldGen"]["Generation"] = 0
        this.genobj["CurrGen"] = {}
        this.genobj["CurrGen"]["Pop"] = []
        this.genobj["CurrGen"]["BestFit"] = 9999
        this.genobj["CurrGen"]["Generation"] = 0
        this.genobj["BestGen"] = {}
        this.genobj["BestGen"]["Pop"] = []
        this.genobj["BestGen"]["BestFit"] = 9999
        this.genobj["BestGen"]["Generation"] = 0
    }

    createFirstPop(p) {

        for (var i = 0; i < p; i++) {
            var singlePop = {}
            singlePop["Route"] = []
            singlePop["Fit"] = 0
            singlePop["Route"] = this.shuffleCities(this.cities)
            this.genobj["CurrGen"]["Pop"].push(singlePop)
        }

        this.calcFitness()
        this.performance["x"].push(0)
        this.performance["y"].push(this.genobj["CurrGen"]["BestFit"])

    }

    nextStep(g, p, m, e) {
        this.genobj["OldGen"] = JSON.parse(JSON.stringify(this.genobj["CurrGen"]));
        this.genobj["CurrGen"]["Generation"] = g
        this.genobj["CurrGen"]["Pop"] = []

        var esize = Math.ceil(this.genobj["OldGen"]["Pop"].length * (e / 100))
        esize = (esize < 2) ? 2 : esize;
        var elite = this.genobj["OldGen"]["Pop"].slice(0, esize);
        this.newPopulation(elite, p, m)

        if (this.genobj["CurrGen"]["BestFit"] < this.genobj["BestGen"]["BestFit"]) {
            this.genobj["BestGen"] = JSON.parse(JSON.stringify(this.genobj["CurrGen"]));
        }
        this.performance["x"].push(g)
        this.performance["y"].push(this.genobj["CurrGen"]["BestFit"])
    }

    newPopulation(elite, p, m) {

        for (var i = 0; i < p; i++) {
            elite = this.shuffleCities(elite)
            var par1 = elite[0]
            var par2 = elite[1]
            var child = this.breed(par1, par2, m)
            var singlePop = {}
            singlePop["Route"] = []
            singlePop["Fit"] = 0
            singlePop["Route"] = child
            this.genobj["CurrGen"]["Pop"].push(singlePop)
        }
        this.calcFitness()
    }

    breed(par1, par2, m) {
        var child = []
        var picked = []

        //Parent1
        for (var i = 0; i < par1["Route"].length; i++) {
            if (Math.random() < 0.5) {
                child[i] = par1["Route"][i]
                picked.push(child[i])
            }
            else (child[i] = null)
        }


        //Parent2
        var overflow = []
        par2 = JSON.parse(JSON.stringify(par2));

        for (var i = 0; i < par2["Route"].length; i++) {
            var city = par2["Route"][i]
            var token = true

            for (var j = 0; j < picked.length; j++) {
                if (JSON.stringify(city) == JSON.stringify(picked[j])) {
                    token = false
                }
            }

            if (token) {
                if (child[i] == null) {
                    child[i] = city
                }
                else overflow.push(city)
            }
        }
        for (var i = 0; i < overflow.length; i++) {
            for (var j = 0; j < child.length; j++) {
                if (child[j] == null) {
                    child[j] = overflow[i]
                    break
                }

            }
        }
        child = this.mutate(child, m)
        return child
    }

    mutate(child, m) {

            if (Math.random() < (m / 100)) {
                var i = this.getRndInteger(0, child.length)
                var j = this.getRndInteger(0, child.length)
                while(i==j){
                    j= this.getRndInteger(0, child.length)
                }
                child[j] = [child[i], child[i] = child[j]][0]

            }
        return child
    }

    calcFitness() {
        this.genobj["CurrGen"]["Pop"].forEach(function (el) {
            var fitness = 0
            var route = el["Route"]
            for (var i = 0; i < route.length; i++) {
                var nextobj = (i + 1) % route.length
                var x1 = route[i]["x"]
                var y1 = route[i]["y"]
                var x2 = route[nextobj]["x"]
                var y2 = route[nextobj]["y"]
                var distance = Math.hypot(x2 - x1, y2 - y1)
                fitness += distance
            }
            fitness = Math.round(fitness)
            el["Fit"] = fitness
        });
        this.genobj["CurrGen"]["Pop"].sort((a, b) => (a["Fit"] > b["Fit"]) ? 1 : -1)
        this.genobj["CurrGen"]["BestFit"] = this.genobj["CurrGen"]["Pop"][0]["Fit"]
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }


    createRandomCities(ncities) {
        for (var i = 0; i < ncities; i++) {
            var x = this.getRndInteger(10, 100);
            var y = this.getRndInteger(10, 100)
            this.cities.push({ "x": x, "y": y })
        }
    }

    createCircleCities(ncities) {
        var radius = 50
        var x = 60
        var y = 60
        var angle = 2 * Math.PI / ncities;
        for (var i = 1; i <= ncities; i++) {
            var point_x = x + radius * Math.cos(i * angle)
            var point_y = y + radius * Math.sin(i * angle)
            this.cities.push({ "x": point_x, "y": point_y })
        }
    }



    getCities() {
        return this.cities
    }

    getStats() {
        var statobj = {}
        statobj["CurrGen"] = this.genobj["CurrGen"]["Generation"]
        statobj["CurrFit"] = this.genobj["CurrGen"]["BestFit"]
        statobj["BestGen"] = this.genobj["BestGen"]["Generation"]
        statobj["BestFit"] = this.genobj["BestGen"]["BestFit"]
        return statobj
    }

    getCurBestR() {
        return this.genobj["CurrGen"]["Pop"][0]["Route"]
    }
    getBestR() {
        return this.genobj["BestGen"]["Pop"][0]["Route"]
    }
    
    getPerf(){
        return this.performance
    }


    shuffleCities(cities) {
        var newarray = JSON.parse(JSON.stringify(cities));
        for (var i = newarray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = newarray[i];
            newarray[i] = newarray[j];
            newarray[j] = temp;
        }
        return newarray
    }






}