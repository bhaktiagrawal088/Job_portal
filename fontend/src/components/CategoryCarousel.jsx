import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const category = [
    "Fontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Graphic Designer",
    
]

function CategoryCarousel() {
  return (
    <div>
        <Carousel className="w-full max-w-xl mx-auto my-5">
            <CarouselContent className="flex space-x-1">
               {
                category.map((cat, index) => (
                    <CarouselItem className= "md:basis-1/3 lg-basis-1/5 flex-shrink-0">
                        <Button variant="outline" className="rounded-xl">{cat}</Button>
                    </CarouselItem>
                ))
               }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
      
    </div>
  )
}

export default CategoryCarousel
