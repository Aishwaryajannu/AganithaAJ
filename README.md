# AganithaAJ
Book-finder project
# Book Finder Application

A web application that helps users search and discover books using the Open Library API.

## Features

- 🔍 **Multiple Search Methods**: Search by title, author, or subject
- 📚 **Rich Book Information**: View covers, authors, publication years, and ratings
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast & Intuitive**: Real-time search with loading states and error handling
- 🎨 **Modern UI**: Clean, professional interface with Tailwind CSS

## Technology Stack

- **Framework**: React (with Hooks)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: Open Library Search API
- **State Management**: React useState

## How to Use

1. Select your search type (Title, Author, or Subject)
2. Enter your search term
3. Click "Search" or press Enter
4. Browse through the results
5. Click "View Details" to see more information on Open Library

## API Integration

The application uses the Open Library Search API:
- Title Search: `https://openlibrary.org/search.json?title={query}`
- Author Search: `https://openlibrary.org/search.json?author={query}`
- Subject Search: `https://openlibrary.org/search.json?subject={query}`

## Key Features Implemented

### User Experience
- **Search Flexibility**: Users can switch between title, author, and subject searches
- **Visual Feedback**: Loading indicators, error messages, and empty states
- **Responsive Grid**: Adapts from 1 to 4 columns based on screen size
- **Keyboard Support**: Press Enter to search

### Error Handling
- Network error handling
- Empty search validation
- No results messaging
- Image fallback for missing covers

### Code Quality
- Clean, readable component structure
- Proper state management
- Efficient API calls with error handling
- Semantic HTML and accessibility considerations

## Future Enhancements

Potential features for future versions:
- Pagination for more results
- Advanced filters (year range, language)
- Favorites/reading list functionality
- Book details modal
- Search history

## Developer Notes

This application was built as part of a take-home challenge, demonstrating:
- Understanding of user needs and requirements
- Clean code practices and component organization
- API integration and error handling
- Responsive design principles
- Modern React patterns and hooks

---

Built with ❤️ for book lovers everywhere
