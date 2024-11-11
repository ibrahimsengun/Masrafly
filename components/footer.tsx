'use client';

export const Footer = () => {
  return (
    <footer className="flex flex-row justify-center items-center p-4 text-sm border-t mt-4 h-[60px]">
      develop by
      <a
        href="https://github.com/ibrahimsengun"
        target="_blank"
        style={{ textDecoration: 'underline', marginLeft: '4px' }}
      >
        ibrahimsengun
      </a>
    </footer>
  );
};
