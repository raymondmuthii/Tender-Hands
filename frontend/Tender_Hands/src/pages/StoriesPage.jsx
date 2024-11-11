// pages/StoriesPage.js just an example
import React from 'react';
import StoryCard from '../components/StoryCard';

const StoriesPage = () => {
  const stories = [
    {
      id: 1,
      title: "Sarah's Journey",
      preview: "A story of determination...",
      content: "Full story content...",
      imageUrl: "/path/to/image.jpg",
      date: new Date(),
      charityName: "Education For All",
      beneficiaryName: "Sarah M."
    }
    // ... more stories
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Beneficiary Stories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map(story => (
          <StoryCard
            key={story.id}
            {...story}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesPage;
