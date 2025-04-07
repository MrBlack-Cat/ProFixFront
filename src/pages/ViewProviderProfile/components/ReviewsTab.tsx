type Props = {
    providerId: number;
  };
  
  const ReviewsTab = ({ providerId }: Props) => {
    return (
      <div>
        <p>Reviews Test  ID: {providerId}</p>
      </div>
    );
  };
  
  export default ReviewsTab;
  