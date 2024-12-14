import React from 'react'
import Card from './Card'

function CardContainer() {

    class Content {
        constructor(img, description) {
            this.img = img;
            this.description = description;
        }
    }

    const content1 = new Content("img/asserts/eyeopening.jpg", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!")
    const content2 = new Content("img/asserts/eyecatching.jpg", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!")

    return (
        <div className='bg-zinc-900 p-10'>
            <h1 className='w-3/5 p-10 font-display text-6xl tracking-tight font-bold'>Two principles we stand behind in every part of our work:
            </h1>
            <div className='lg:flex justify-center align-center'>
                <Card {...content1} />
                <Card {...content2} />
            </div>
        </div>
    )
}

export default CardContainer