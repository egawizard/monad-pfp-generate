export default function Footer() {
  return (
    <footer className="mt-16 text-center">
      <div className="border-t border-gray-700 pt-8">
        <p className="text-gray-400 mb-2">
          Made with ❤️ using AI Technology
        </p>
        <p className="text-gray-500">
          Created by{' '}
          <a 
            href="https://x.com/ega_2ez4crypto" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            @ega_2ez4crypto
          </a>
        </p>
      </div>
    </footer>
  );
}