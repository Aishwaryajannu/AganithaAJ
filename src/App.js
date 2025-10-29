import React, { useState, useEffect } from 'react';
import { Search, Book, User, Calendar, Star, Loader2, AlertCircle } from 'lucide-react';

export default function BookFinder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const searchBooks = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      let url = '';
      switch (searchType) {
        case 'title':
          url = `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}&limit=20`;
          break;
        case 'author':
          url = `https://openlibrary.org/search.json?author=${encodeURIComponent(searchTerm)}&limit=20`;
          break;
        case 'subject':
          url = `https://openlibrary.org/search.json?subject=${encodeURIComponent(searchTerm)}&limit=20`;
          break;
        default:
          url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=20`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      setBooks(data.docs || []);
      
      if (data.docs.length === 0) {
        setError('No books found. Try a different search term.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  const getCoverUrl = (book) => {
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <Book className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Book Finder</h1>
          </div>
          <p className="mt-2 text-gray-600">Discover your next great read from millions of books</p>
        </div>
      </header>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col gap-4">
           
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'title', label: 'Title', icon: Book },
                { value: 'author', label: 'Author', icon: User },
                { value: 'subject', label: 'Subject', icon: Star }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setSearchType(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    searchType === value
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

        
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Search by ${searchType}... (e.g., ${
                    searchType === 'title' ? 'Harry Potter' :
                    searchType === 'author' ? 'J.K. Rowling' :
                    'Fantasy'
                  })`}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={searchBooks}
                disabled={loading}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
          </div>
        ) : hasSearched && books.length === 0 ? (
          <div className="text-center py-20">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search terms or search type</p>
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Found <span className="font-semibold text-gray-900">{books.length}</span> books
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <div
                  key={`${book.key}-${index}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
           
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                    {getCoverUrl(book) ? (
                      <img
                        src={getCoverUrl(book)}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="text-gray-400"><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg></div>';
                        }}
                      />
                    ) : (
                      <Book className="w-16 h-16 text-gray-400" />
                    )}
                  </div>

              
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {book.title}
                    </h3>
                    
                    {book.author_name && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <User className="w-4 h-4" />
                        <span className="line-clamp-1">{book.author_name.join(', ')}</span>
                      </div>
                    )}
                    
                    {book.first_publish_year && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>{book.first_publish_year}</span>
                      </div>
                    )}

                    {book.ratings_average && (
                      <div className="flex items-center gap-2 mb-3">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{book.ratings_average.toFixed(1)}</span>
                      </div>
                    )}

                    <a
                      href={`https://openlibrary.org${book.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Search</h3>
            <p className="text-gray-500">Search by title, author, or subject to find your next book</p>
          </div>
        )}
      </main>
    </div>
  );
}