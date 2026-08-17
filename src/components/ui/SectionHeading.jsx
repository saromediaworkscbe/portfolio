export default function SectionHeading({ slate, title }) {
  return (
    <div className="mb-10 md:mb-16">
      <p className="tc !text-signal mb-3">{slate}</p>
      <h2 className="display-wide text-4xl md:text-6xl">{title}</h2>
      <div className="sprocket mt-6" />
    </div>
  );
}
