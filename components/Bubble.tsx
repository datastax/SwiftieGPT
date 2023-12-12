import { useState } from "react";
import Link from "next/link";
import {forwardRef, JSXElementConstructor, RefObject} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Bubble:JSXElementConstructor<any> = forwardRef(function Bubble({ content }, ref) {
  const { role } = content;
  const isUser = role === "user"
  const [hasSource, setHasSource] = useState(false);

  return (
    <div ref={ref  as RefObject<HTMLDivElement>} className={`block mt-4 md:mt-6 pb-[7px] clear-both ${isUser ? 'float-right' : 'float-left'}`}>
      <div className={`flex justify-end ${hasSource ? 'mb-4' : ''}`}>
        <div className={`talk-bubble${isUser ? ' user' : ''} p-2 md:p-4`}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              a({ href, children }) {
                setHasSource(true);
                return (
                  <span className="source-link flex no-wrap">
                    Source:
                    <a 
                      href={href}
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.3333 4.66666H8.66665V5.99999H11.3333C12.4333 5.99999 13.3333 6.89999 13.3333 7.99999C13.3333 9.09999 12.4333 9.99999 11.3333 9.99999H8.66665V11.3333H11.3333C13.1733 11.3333 14.6666 9.83999 14.6666 7.99999C14.6666 6.15999 13.1733 4.66666 11.3333 4.66666ZM7.33331 9.99999H4.66665C3.56665 9.99999 2.66665 9.09999 2.66665 7.99999C2.66665 6.89999 3.56665 5.99999 4.66665 5.99999H7.33331V4.66666H4.66665C2.82665 4.66666 1.33331 6.15999 1.33331 7.99999C1.33331 9.83999 2.82665 11.3333 4.66665 11.3333H7.33331V9.99999ZM5.33331 7.33332H10.6666V8.66666H5.33331V7.33332Z" fill="#6B6F73"/>
                      </svg>
                      {children}
                    </a>
                  </span>
                )
              }, 
              code({ node, children, ...props }) {
                return (
                  <code {...props}>
                      {children}
                  </code>
                  )
              }
            }}
          >
            {content?.content}
          </Markdown>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.730278 0.921112C-3.49587 0.921112 12 0.921112 12 0.921112V5.67376C12 6.8181 9.9396 7.23093 9.31641 6.27116C6.83775 2.45382 3.72507 0.921112 0.730278 0.921112Z" />
          </svg>
        </div>
      </div>
    </div>
  )
})

export default Bubble;