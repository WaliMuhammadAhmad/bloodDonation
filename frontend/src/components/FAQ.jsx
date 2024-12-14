import Collapse from "./Collapse";

function FAQ() {
  class Content {
    constructor(title, description) {
      this.title = title;
      this.description = description;
    }
  }

  const content1 = new Content(
    "How do we choose template",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content2 = new Content(
    "How do we choose template",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content3 = new Content(
    "How do we reach you out",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content4 = new Content(
    "How do we deliver presentation to you",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content5 = new Content(
    "How do we charge plans",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content6 = new Content(
    "How do we ask if anything goes wrong",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content7 = new Content(
    "How do we do the best",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content8 = new Content(
    "How do we change the requirements of the project",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content9 = new Content(
    "How do we take care of our clients",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );
  const content10 = new Content(
    "How do we react to your feedback",
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis saepe voluptate fugiat debitis delectus soluta facere obcaecati, optio architecto fugit dolorem non maiores labore velit sit omnis culpa perferendis dolores.Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa similique nesciunt facilis ab hic expedita consequuntur incidunt sint. Consequatur incidunt blanditiis saepe omnis odio sed doloribus vero consequuntur officia quibusdam!"
  );

  const contentArray = [
    content1,
    content2,
    content3,
    content4,
    content5,
    content6,
    content7,
    content8,
    content9,
    content10,
  ];

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
      <h1 className='font-condensed text-5xl'>You might wanna ask</h1>
      {renderContent()}
    </div>
  );
}

export default FAQ;
