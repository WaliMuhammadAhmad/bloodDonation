import React from "react";
import Collapse from "./Collapse";

function Reviews() {
  class Content {
    constructor(title, description) {
      this.title = title;
      this.description = description;
    }
  }

  const content1 = new Content(
    "Client's Name ",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content2 = new Content(
    "Client's Name ",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content3 = new Content(
    "Client's Name ",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content4 = new Content(
    "Client's Name ",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content5 = new Content(
    "Client's Name ",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );

  const contentArray = [content1, content2, content3, content4, content5];

  const renderContent = () => {
    return contentArray.map((content, index) => (
      <div className='p-1 '>
        <Collapse
          key={index}
          title={content.title}
          description={content.description}
        />
      </div>
    ));
  };

  return (
    <div className='px-10 py-10 border-t-2 border-b-2 border-zinc-700'>
      <h1 className='font-condensed text-5xl'>What did our clients said</h1>
      {renderContent()}
    </div>
  );
}

export default Reviews;
