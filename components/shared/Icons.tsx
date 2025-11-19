export function AttachIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="m8.788,22.852c-1.935,0-3.869-.719-5.308-2.157-2.877-2.877-2.877-7.737,0-10.614l7.431-7.43c2.19-2.191,5.623-2.191,7.813,0,2.19,2.19,2.19,5.623,0,7.813l-6.835,6.735c-.683.683-1.665,1.054-2.579,1.037-.921-.024-1.761-.408-2.366-1.08-.651-.648-1.03-1.591-1.006-2.546.024-.921.408-1.761,1.08-2.366l6.169-6.171,1.414,1.414-6.207,6.207c-.298.271-.447.602-.456.968-.011.41.155.817.456,1.118.271.298.602.447.968.456.409.019.816-.155,1.118-.456l6.835-6.735c1.393-1.393,1.393-3.583-.005-4.98s-3.586-1.398-4.985,0l-7.431,7.43c-2.11,2.11-2.11,5.676,0,7.786,2.11,2.108,5.674,2.109,7.786,0l9.007-9.007,1.414,1.414-9.007,9.007c-1.438,1.438-3.373,2.157-5.307,2.157Z"
          strokeWidth="0"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.29106 3.3088C3.00745 3.18938 2.67967 3.25533 2.4643 3.47514C2.24894 3.69495 2.1897 4.02401 2.31488 4.30512L5.40752 11.25H13C13.4142 11.25 13.75 11.5858 13.75 12C13.75 12.4142 13.4142 12.75 13 12.75H5.40754L2.31488 19.6949C2.1897 19.976 2.24894 20.3051 2.4643 20.5249C2.67967 20.7447 3.00745 20.8107 3.29106 20.6912L22.2911 12.6913C22.5692 12.5742 22.75 12.3018 22.75 12C22.75 11.6983 22.5692 11.4259 22.2911 11.3088L3.29106 3.3088Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}

export function LoadingIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

export function RemoveFileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

export function ChatIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path d="M24,11C24,5.486,18.617,1,12,1S0,5.486,0,11,5.383,21,11.979,21a11.811,11.811,0,0,0,3.056-.348l5.588,2.275A1.011,1.011,0,0,0,21,23a1,1,0,0,0,.994-1.114l-.545-4.718A9.3,9.3,0,0,0,24,11Zm-7.93.864-4.032,4.1a.055.055,0,0,1-.077,0l-4.03-4.1A2.925,2.925,0,0,1,7.629,8a2.7,2.7,0,0,1,4.33.18.048.048,0,0,0,.08,0A2.7,2.7,0,0,1,16.369,8,2.923,2.923,0,0,1,16.07,11.864Z" fill="currentColor" />
      </g>
    </svg>
  );
}

export function LinksIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path fill="currentColor" d="M21,8.424v2.356c0.609,0.549,1,1.337,1,2.22v4c0,1.654-1.346,3-3,3h-9c-1.654,0-3-1.346-3-3 v-4c0-1.654,1.346-3,3-3h5V8h-5c-2.757,0-5,2.243-5,5v4c0,2.757,2.243,5,5,5h9c2.757,0,5-2.243,5-5v-4 C24,10.955,22.763,9.198,21,8.424z" />
        <path fill="currentColor" d="M14,2H5C2.243,2,0,4.243,0,7v4c0,2.045,1.237,3.802,3,4.576V13.22C2.391,12.67,2,11.883,2,11V7 c0-1.654,1.346-3,3-3h9c1.654,0,3,1.346,3,3v4c0,1.654-1.346,3-3,3H9v2h5c2.757,0,5-2.243,5-5V7C19,4.243,16.757,2,14,2z" />
      </g>
    </svg>
  );
}

export function ImagesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M10.9456 12.1696L17.9994 16.2421L17.9994 19.5L14.5 20.5L7.93774 22.9364L6.13884 22.0624L10.9456 12.1696Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M12.3323 5.55173C13.9327 5.1229 15.5777 6.07265 16.0065 7.67305L18.5947 17.3323C19.0235 18.9327 18.0738 20.5777 16.4734 21.0065L6.81414 23.5947C5.21374 24.0236 3.56873 23.0738 3.13991 21.4734L0.551716 11.8142C0.122891 10.2138 1.07264 8.56874 2.67304 8.13992L12.3323 5.55173ZM14.0747 8.19068C13.9317 7.65722 13.3834 7.34064 12.8499 7.48358L3.19067 10.0718C2.65721 10.2147 2.34063 10.763 2.48357 11.2965L5.07176 20.9558C5.2147 21.4892 5.76304 21.8058 6.2965 21.6629L15.9558 19.0747C16.4892 18.9317 16.8058 18.3834 16.6629 17.8499L14.0747 8.19068Z" fill="currentColor" />
        <path fillRule="evenodd" clipRule="evenodd" d="M5.06248 13.1937C4.84807 12.3935 5.32294 11.571 6.12314 11.3566C6.92334 11.1422 7.74585 11.617 7.96026 12.4172C8.17467 13.2174 7.6998 14.0399 6.8996 14.2544C6.0994 14.4688 5.2769 13.9939 5.06248 13.1937Z" fill="currentColor" />
        <path d="M23.5947 6.81418C24.0235 5.21379 23.0738 3.56877 21.4734 3.13995L11.8141 0.551759C10.2137 0.122933 8.56873 1.07268 8.1399 2.67308L7.58234 4.75395L11.8147 3.6199C14.482 2.90519 17.2237 4.4881 17.9384 7.15543L20.5266 16.8147C20.5715 16.9822 20.6073 17.15 20.6343 17.3176C20.7972 17.0636 20.9243 16.7805 21.0065 16.4734L23.5947 6.81418Z" fill="currentColor" />
      </g>
    </svg>
  );
}

export function FilesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path d="M14,17a1,1,0,0,1,1-1h7V1a1,1,0,0,0-1-1H3A1,1,0,0,0,2,1V23a1,1,0,0,0,1,1H14ZM5,5H19V7H5Zm0,5H19v2H5Zm6,7H5V15h6Z" fill="currentColor" />
        <polygon points="21.414 18 16 18 16 23.414 21.414 18" fill="currentColor" />
      </g>
    </svg>
  );
}

export function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor" fillRule="evenodd">
        <path d="m23,13v-2h-2.059c-.102-.916-.343-1.791-.699-2.603l1.785-1.03-1-1.732-1.792,1.035c-.536-.726-1.177-1.366-1.903-1.903l1.035-1.792-1.732-1-1.03,1.785c-.813-.357-1.687-.598-2.603-.699V1h-2v2.059c-.916.102-1.791.343-2.603.699l-1.03-1.785-1.732,1,1.035,1.792c-.726.536-1.366,1.177-1.903,1.903l-1.792-1.035-1,1.732,1.785,1.03c-.357.813-.598,1.687-.699,2.603H1v2h2.059c.102.916.343,1.791.699,2.603l-1.785,1.03,1,1.732,1.792-1.035c.536.726,1.177,1.366,1.903,1.903l-1.035,1.792,1.732,1,1.03-1.785c.813.357,1.687.598,2.603.699v2.059h2v-2.059c.916-.102,1.791-.343,2.603-.699l1.03,1.785,1.732-1-1.035-1.792c.726-.536,1.366-1.177,1.903-1.903l1.792,1.035,1-1.732-1.785-1.03c.357-.813.598-1.687.699-2.603h2.059Z M12,7c2.419,0,4.436,1.718,4.899,4h-4.322l-2.149-3.723c.497-.166,1.019-.277,1.572-.277ZM7,12c0-1.488.663-2.809,1.695-3.725l2.151,3.725-2.151,3.725c-1.032-.916-1.695-2.237-1.695-3.725ZM12,17c-.553,0-1.075-.111-1.572-.277l2.149-3.723h4.322c-.463,2.282-2.48,4-4.899,4Z" fill="currentColor" strokeWidth="0" />
      </g>
    </svg>
  );
}

export function EmojiIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" />
        <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
        <path d="M8 15L16 15" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function EmojiIconActive(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" strokeWidth="2" />
        <path d="M12 18C14.2091 18 16 16.2091 16 14H8C8 16.2091 9.79086 18 12 18Z" strokeWidth="2" />
        <path d="M14 10V9.75C14 8.7835 14.7835 8 15.75 8V8C16.7165 8 17.5 8.7835 17.5 9.75V10" strokeWidth="2" />
        <path d="M6.5 10V9.75C6.5 8.7835 7.2835 8 8.25 8V8C9.2165 8 10 8.7835 10 9.75V10" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="currentColor">
        <path d="M12 22C14.4398 20.8824 23 14.6884 23 9.0107C23 5.69129 20.3468 3 17.0776 3C14.9216 3 13.3112 4.37247 12 5.91259C10.691 4.37024 9.0784 3 6.9224 3C3.651 3 1 5.69129 1 9.0107C1 14.6884 9.5602 20.8824 12 22Z" fill="currentColor" />
      </g>
    </svg>
  );
}
