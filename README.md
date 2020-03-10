

![](/img/thumbnail.png)


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

<img src="https://github.com/BenSchr/GeneticAlgorithm/img/bruteforce.JPG" width="50%"/>
<!-- ![](/img/bruteforce.JPG) -->


## Computaion

### 0. Composition

<img src="https://github.com/BenSchr/GeneticAlgorithm/img/composition.JPG" width="50%"/>
<!-- ![](/img/composition.JPG) -->


### 1. Generation Zero

The algorithm starts in generation zero with a population of completely randomly generated members.
<img src="https://github.com/BenSchr/GeneticAlgorithm/img/thumbnail.png" width="50%"/>
<!-- ![](/img/thumbnail.png) -->



To order them, the distance of the track is measured. The members with the lowest distance have the highest fitness.
The 'Elite' parameter is used to determine the percentage of the fittest members that are allowed to reproduce. When crossing the genes of the parents, the child receives a portion of each parent's route, resulting in a combined route with a hopefully shorter distance.
This is repeated until the new population is completely filled.

## Diversity is the key

After several generations, the algorithm has calculated the best possible routes from the random initial population and stagnates. To prevent this, the parameters 'Mutation' and 'Random' can be set.  
The mutation causes children to randomly swap two places on the route after they have been generated, thus generating a new route that was not previously in the gene pool.  
With the 'Random' parameter, completely new random members can be added to the population to refresh the gene pool. 

