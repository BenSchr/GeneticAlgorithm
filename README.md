

![](/img/thumbnail.JPG)


**Link**: [Website](https://benschr.github.io/GeneticAlgorithm/geneticalg.html)    
**Blog**: TBA

## Controls

- **Mode:** You can choose between circle and random points    
- **Points:** Number of points  
- **Redraw:** Refreshs the graphs with new settings  

<br/> 

- **Population:** Number of members per generation 
- **Elite:** Control the percentage of the fittest members that can reproduce/crossover
- **Mutation:** Chance of a reproduced child getting a mutation. In this case, two random points are swapped
- **Random:** Percentage of population that is fully random each generation
   
<br/> 
   
- **Start:** Start/Stop the autoplay function. Limits at generation 1000  
- **Step:** Steps one generation forward


## Salesperson Problem

The salesperson problem defines the requirement to calculate the shortest possible distance between a set of points.

## Brute Force

A brute force solution to this problem in which you would test every existing combination would take a huge amount of tries.

<img src="https://github.com/BenSchr/GeneticAlgorithm/blob/master/img/bruteforce.JPG?raw=true" width="60%"/>


## Computaion

So let's have a look at the genetic algorithm solution

### 0. Composition

<img src="https://github.com/BenSchr/GeneticAlgorithm/blob/master/img/composition.JPG?raw=true" width="80%"/>

The genetic algorithm is based on an evolutionary development of the solution approaches. One step in this evolution is called generation. A generation consists of a population of several different solution sets. In this case it is a sequence of points that together form a route.  
Since we want to calculate the shortest possible route, each member of the population gets a better fitness the shorter the route.


### 1. Generation Zero

The algorithm starts in generation zero with a population of completely randomly generated members.  
<img src="https://github.com/BenSchr/GeneticAlgorithm/blob/master/img/elite.JPG?raw=true" width="80%"/>


### Elite-Size

The 'Elite' parameter is used to determine the percentage of the fittest members that are allowed to reproduce. 

<img src="https://github.com/BenSchr/GeneticAlgorithm/blob/master/img/gen0.JPG?raw=true" width="80%"/>


### Crossover

When crossing the genes of the parents, the child receives a portion of each parent's route, resulting in a combined route with a hopefully shorter distance.
This is repeated until the new population is completely filled.

<img src="https://github.com/BenSchr/GeneticAlgorithm/blob/master/img/crossover.JPG?raw=true" width="80%"/>

## Diversity is the key

After several generations, the algorithm has calculated the best possible routes from the random initial population and stagnates. To prevent this, the parameters 'Mutation' and 'Random' can be set.  
The mutation causes children to randomly swap two places on the route after they have been generated, thus generating a new route that was not previously in the gene pool.  
With the 'Random' parameter, completely new random members can be added to the population to refresh the gene pool. 

<img src="https://github.com/BenSchr/GeneticAlgorithm/blob/master/img/mutation.JPG?raw=true" width="80%"/>

