// src/pages/HomePage.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DonationCard from '../components/DonationCard';
import StoryCard from '../components/StoryCard';
import { fetchFeaturedCharities } from '../redux/slices/charitySlice';
import { fetchStories } from '../redux/slices/storySlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { featured = [], loading: charitiesLoading } = useSelector(
    (state) => state.charities
  );
  const { stories = [], loading: storiesLoading } = useSelector(
    (state) => state.stories
  );

  useEffect(() => {
    dispatch(fetchFeaturedCharities());
    dispatch(fetchStories());
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
              Make a Difference Today
            </h1>
            <p className="mt-4 text-xl">
              Support causes that matter
            </p>
            <div className="mt-8">
              <Link
                to="/charities"
                className="inline-block bg-white text-purple-700 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Charities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Charities
          </h2>
          {charitiesLoading ? (
            <div className="text-center">Loading charities...</div>
          ) : featured?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((charity) => (
                <DonationCard key={charity.id} {...charity} />
              ))}
            </div>
          ) : (
            <div className="text-center">No charities found</div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/charities"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              View All Charities →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Stories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Impact Stories
          </h2>
          {storiesLoading ? (
            <div className="text-center">Loading stories...</div>
          ) : stories?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard key={story.id} {...story} />
              ))}
            </div>
          ) : (
            <div className="text-center">No stories found</div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/stories"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Read More Stories →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
