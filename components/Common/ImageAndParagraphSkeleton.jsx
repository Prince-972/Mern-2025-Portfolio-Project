import React from 'react'

const ImageAndParagraphSkeleton = ({ className }) => {
    return (
        <div role="status" class={`card_stylings max-w-2xl p-4 border shadow animate-pulse md:p-6 border-Green/10 ${className}`}>
            <div class="flex items-center justify-center h-48 mb-4 rounded bg-Green/10">
                <img className='absolute top-8 w-full h-full object-cover rounded-xl' src="/Portfolio-main/public/Banner-photo.png" alt="Banner Photo" />
            </div>
            <div class="h-2.5 rounded-full bg-Green/10 w-48 mb-4"></div>
            <div class="h-2 rounded-full bg-Green/10 mb-2.5"></div>
            <div class="h-2 rounded-full bg-Green/10 mb-2.5"></div>
            <div class="h-2 rounded-full bg-Green/10"></div>
            <span class="sr-only">Loading...</span>
        </div>
    )
}

export default ImageAndParagraphSkeleton