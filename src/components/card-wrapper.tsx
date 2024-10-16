const CardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h2>CardWrapper</h2>

      {children}

      <h2>hello wrapper</h2>
    </div>
  );
};

export default CardWrapper;
