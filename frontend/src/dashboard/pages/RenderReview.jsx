import { useState } from "react";

const theme = {
  TextArea:
    "w-full h-48 p-4 border rounded-xl font-display bg-background text-text",
  Button: "px-4 py-2 rounded",
  ButtonEnabled: "bg-red-500 text-text hover:bg-green-600",
  ButtonDisabled: "bg-zinc-300 text-zinc-600 cursor-not-allowed",
  SectionTitle: "font-condensed text-5xl font-bold text-text mb-4",
};

const dummyAppeals = [
  { id: 1, title: "Appeal for A+ blood", role: "user" },
  { id: 2, title: "Appeal for B+ blood", role: "user" },
];

const dummyDonations = [
  { id: 1, title: "Donation request for O- blood", role: "donor" },
  { id: 2, title: "Donation request for AB+ blood", role: "donor" },
];

// eslint-disable-next-line react/prop-types
function RenderReview({ role }) {
  const [reviewText, setReviewText] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [isValid, setIsValid] = useState(false);

  const data = role === "user" ? dummyAppeals : dummyDonations;

  const handleTextChange = (e) => {
    const text = e.target.value;
    setReviewText(text);
    setIsValid(text.trim() !== "" && selectedItem !== "");
  };

  const handleItemChange = (e) => {
    const selected = e.target.value;
    setSelectedItem(selected);
    setIsValid(reviewText.trim() !== "" && selected !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    // Simulate API call or backend integration
    console.log(`Review for ${selectedItem}: ${reviewText}`);
    alert(`Thank you for your review!`);
    setReviewText("");
    setSelectedItem("");
    setIsValid(false);
  };

  return (
    <div>
      <h1 className={theme.SectionTitle}>
        {role === "user"
          ? "Tell us about your appeal experience:"
          : "Share your donation experience:"}
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Select Item */}
        <div className='mb-4'>
          <label htmlFor='item-select' className='font-bold text-text'>
            Select related {role === "user" ? "appeal" : "donation request"}:
          </label>
          <select
            id='item-select'
            value={selectedItem}
            onChange={handleItemChange}
            className='w-full p-2 border rounded-xl font-display bg-background text-text mt-2'>
            <option value='' disabled>
              Select an option
            </option>
            {data.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {/* Text Area */}
        <textarea
          className={theme.TextArea}
          placeholder='Write your review here...'
          value={reviewText}
          onChange={handleTextChange}></textarea>

        {/* Submit Button */}
        <div className='flex justify-end mt-4'>
          <button
            type='submit'
            className={`${theme.Button} ${
              isValid ? theme.ButtonEnabled : theme.ButtonDisabled
            }`}
            disabled={!isValid}>
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default RenderReview;
