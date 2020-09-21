<template>
  <div 
    class="collection__container"
  >
    <h4 class="header__table">
      Collection Options
    </h4>
    <div class="portfolio__options_item">
      <div class="collection__add_container">
        <div
          @click="addNewCollection(0)"
          class="collection__add_item"
          :class="{'collection__background': isActiveFolder}"
        >
          <svg 
            width="65" height="60" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="portfolio__option_img_icon"
          >
            <g filter="url(#filter0_d)">
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V26.25C4 27.625 5.11929 28.75 6.5 28.75H31.5C32.8813 28.75 34 27.625 34 26.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#2F5269"/>
            <path d="M7.75 1.25C6.36925 1.25 5.25 2.375 5.25 3.75V21.25C5.25 22.625 6.36925 23.75 7.75 23.75H21.5H27.75H30.25C31.6313 23.75 32.75 22.625 32.75 21.25V10V6.25C32.75 4.875 31.6313 3.75 30.25 3.75H27.75H21.5H20.25L16.5 1.25H7.75Z" fill="#45708C"/>
            <path d="M32.75 17.5V7.5C32.75 6.125 31.6313 5 30.25 5H16.5H10.25H7.75C6.36925 5 5.25 6.125 5.25 7.5V17.5H32.75Z" fill="#BDC3C7"/>
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V16.25V17.5V25C4 26.375 5.11929 27.5 6.5 27.5H31.5C32.8813 27.5 34 26.375 34 25V17.5V16.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#64748F"/>
            <path d="M10.5625 10C10.1327 10 9.77475 10.1249 9.46875 10.3749C9.16275 10.7499 9 11.1249 9 11.4999V23.3749C9 23.8749 9.16275 24.125 9.46875 24.5C9.77475 24.75 10.1327 25 10.5625 25H25.25H26.5H27.4375C27.8675 25 28.225 24.75 28.5312 24.5C28.8375 24.125 29 23.8749 29 23.3749V11.4999C29 11.1249 28.8375 10.7499 28.5312 10.3749C28.225 10.1249 27.8675 10 27.4375 10H26.5H25.25H10.5625ZM10.5625 11.25H25.25H26.5H27.4375H27.6725C27.7375 11.375 27.75 11.3749 27.75 11.4999V23.3749C27.75 23.4999 27.7375 23.5 27.6725 23.625C27.6137 23.625 27.5225 23.75 27.4375 23.75H26.5H25.25H10.5625C10.4779 23.75 10.3932 23.625 10.3281 23.625C10.2695 23.5 10.25 23.4999 10.25 23.3749V11.4999C10.25 11.3749 10.2695 11.375 10.3281 11.25H10.5625ZM13.375 12.5C12.8541 12.5 12.4115 12.625 12.0469 13C11.6822 13.375 11.5 13.75 11.5 14.375C11.5 14.875 11.6822 15.25 12.0469 15.625C12.4115 16 12.8541 16.25 13.375 16.25C13.8959 16.25 14.3385 16 14.7031 15.625C15.0678 15.25 15.25 14.875 15.25 14.375C15.25 13.75 15.0678 13.375 14.7031 13C14.3385 12.625 13.8959 12.5 13.375 12.5ZM21.1875 13.9999L16.1875 18.9999L14.625 17.5L11.5 20.625V22.5H26.5V20L21.1875 13.9999Z" fill="#D5D5D5"/>
            </g>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M46 23H43V29H37V32H43V38H46V32H52V29H46V23Z" fill="#64748F"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>
          <div class="portfolio__options_link">
            New Collection
          </div>
        </div>

        <div 
          :style="{ marginLeft: 30 + 'px' }"
          class="collection__add_item"
          @click="addNewCollection(1)"
          :class="{'collection__background': isActiveRename}"
        >
          <svg 
            class="portfolio__option_img_icon"
            width="65" height="60" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V26.25C4 27.625 5.11929 28.75 6.5 28.75H31.5C32.8813 28.75 34 27.625 34 26.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#2F5269"/>
            <path d="M7.75 1.25C6.36925 1.25 5.25 2.375 5.25 3.75V21.25C5.25 22.625 6.36925 23.75 7.75 23.75H21.5H27.75H30.25C31.6313 23.75 32.75 22.625 32.75 21.25V10V6.25C32.75 4.875 31.6313 3.75 30.25 3.75H27.75H21.5H20.25L16.5 1.25H7.75Z" fill="#45708C"/>
            <path d="M32.75 17.5V7.5C32.75 6.125 31.6313 5 30.25 5H16.5H10.25H7.75C6.36925 5 5.25 6.125 5.25 7.5V17.5H32.75Z" fill="#BDC3C7"/>
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V16.25V17.5V25C4 26.375 5.11929 27.5 6.5 27.5H31.5C32.8813 27.5 34 26.375 34 25V17.5V16.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#64748F"/>
            <path d="M10.5625 10C10.1327 10 9.77475 10.1249 9.46875 10.3749C9.16275 10.7499 9 11.1249 9 11.4999V23.3749C9 23.8749 9.16275 24.125 9.46875 24.5C9.77475 24.75 10.1327 25 10.5625 25H25.25H26.5H27.4375C27.8675 25 28.225 24.75 28.5312 24.5C28.8375 24.125 29 23.8749 29 23.3749V11.4999C29 11.1249 28.8375 10.7499 28.5312 10.3749C28.225 10.1249 27.8675 10 27.4375 10H26.5H25.25H10.5625ZM10.5625 11.25H25.25H26.5H27.4375H27.6725C27.7375 11.375 27.75 11.3749 27.75 11.4999V23.3749C27.75 23.4999 27.7375 23.5 27.6725 23.625C27.6137 23.625 27.5225 23.75 27.4375 23.75H26.5H25.25H10.5625C10.4779 23.75 10.3932 23.625 10.3281 23.625C10.2695 23.5 10.25 23.4999 10.25 23.3749V11.4999C10.25 11.3749 10.2695 11.375 10.3281 11.25H10.5625ZM13.375 12.5C12.8541 12.5 12.4115 12.625 12.0469 13C11.6822 13.375 11.5 13.75 11.5 14.375C11.5 14.875 11.6822 15.25 12.0469 15.625C12.4115 16 12.8541 16.25 13.375 16.25C13.8959 16.25 14.3385 16 14.7031 15.625C15.0678 15.25 15.25 14.875 15.25 14.375C15.25 13.75 15.0678 13.375 14.7031 13C14.3385 12.625 13.8959 12.5 13.375 12.5ZM21.1875 13.9999L16.1875 18.9999L14.625 17.5L11.5 20.625V22.5H26.5V20L21.1875 13.9999Z" fill="#D5D5D5"/>
            </g>
            <path d="M51.1314 26.4147C50.8342 25.9235 50.4676 25.4424 50.019 24.9963C49.5653 24.5457 49.0759 24.1766 48.5751 23.8801L49.4545 23C49.4545 23 50.7273 23 51.3636 23.6364C52 24.2727 52 25.5455 52 25.5455L51.1314 26.4147ZM43.7273 33.8182H41.1818V31.2727L41.4873 30.9673C42.0046 31.2123 42.5188 31.5565 42.9815 32.0185C43.4447 32.4825 43.7884 32.9954 44.0327 33.5127L43.7273 33.8182ZM50.3964 27.1491L44.7671 32.7777C44.4699 32.2871 44.1034 31.8047 43.6547 31.3593C43.2016 30.9081 42.7116 30.5396 42.2108 30.2431L47.8509 24.6036C48.3683 24.8474 48.8825 25.1916 49.3451 25.6543C49.809 26.1175 50.1526 26.6317 50.3964 27.1491ZM39.9091 24.9091V35.0909H50.0909V30.6364L52 28.7031V35.7273C52 36.4305 51.4298 37 50.7273 37H39.2727C38.5702 37 38 36.4305 38 35.7273V24.2727C38 23.5702 38.5702 23 39.2727 23H46.2791L44.3694 24.9091H39.9091Z" fill="#64748F"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>
          <div class="portfolio__options_link">
            Rename
          </div>
        </div>

        <!-- //dmobile add folder -->
        <AddCollection
          v-if="isAddCollection && screenType === 'mobile'"
          :isAddCollection="isAddCollection"
          :dataCollectionFolder="dataCollectionFolder"
          :isPath="isPath"
          @UpdateDatas="UpdateDatas"
        />

        <!-- //mobile rename -->
          <RenameCollection
            v-if="isRenameCollection && screenType === 'mobile'"
            :dataCollectionFolder="dataCollectionFolder"
            :isRenameCollection="isRenameCollection"
            :isPath="isPath"
            :allImage="allImage" 
            :allFolder="allFolder"
            @UpdateDatas="UpdateDatas"
          />

        <div 
          :style="{ marginLeft: 30 + 'px' }"
          class="collection__add_item"
          @click="addNewCollection(2)"
          :class="{'collection__background': isActiveMove}"
        >
          <svg 
            width="65" height="60" viewBox="0 0 48 39" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="portfolio__option_img_icon"
          >
            <g filter="url(#filter0_d)">
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V26.25C4 27.625 5.11929 28.75 6.5 28.75H31.5C32.8813 28.75 34 27.625 34 26.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#2F5269"/>
            <path d="M7.75 1.25C6.36925 1.25 5.25 2.375 5.25 3.75V21.25C5.25 22.625 6.36925 23.75 7.75 23.75H21.5H27.75H30.25C31.6313 23.75 32.75 22.625 32.75 21.25V10V6.25C32.75 4.875 31.6313 3.75 30.25 3.75H27.75H21.5H20.25L16.5 1.25H7.75Z" fill="#45708C"/>
            <path d="M32.75 17.5V7.5C32.75 6.125 31.6313 5 30.25 5H16.5H10.25H7.75C6.36925 5 5.25 6.125 5.25 7.5V17.5H32.75Z" fill="#BDC3C7"/>
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V16.25V17.5V25C4 26.375 5.11929 27.5 6.5 27.5H31.5C32.8813 27.5 34 26.375 34 25V17.5V16.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#64748F"/>
            <path d="M10.5625 10C10.1327 10 9.77475 10.1249 9.46875 10.3749C9.16275 10.7499 9 11.1249 9 11.4999V23.3749C9 23.8749 9.16275 24.125 9.46875 24.5C9.77475 24.75 10.1327 25 10.5625 25H25.25H26.5H27.4375C27.8675 25 28.225 24.75 28.5312 24.5C28.8375 24.125 29 23.8749 29 23.3749V11.4999C29 11.1249 28.8375 10.7499 28.5312 10.3749C28.225 10.1249 27.8675 10 27.4375 10H26.5H25.25H10.5625ZM10.5625 11.25H25.25H26.5H27.4375H27.6725C27.7375 11.375 27.75 11.3749 27.75 11.4999V23.3749C27.75 23.4999 27.7375 23.5 27.6725 23.625C27.6137 23.625 27.5225 23.75 27.4375 23.75H26.5H25.25H10.5625C10.4779 23.75 10.3932 23.625 10.3281 23.625C10.2695 23.5 10.25 23.4999 10.25 23.3749V11.4999C10.25 11.3749 10.2695 11.375 10.3281 11.25H10.5625ZM13.375 12.5C12.8541 12.5 12.4115 12.625 12.0469 13C11.6822 13.375 11.5 13.75 11.5 14.375C11.5 14.875 11.6822 15.25 12.0469 15.625C12.4115 16 12.8541 16.25 13.375 16.25C13.8959 16.25 14.3385 16 14.7031 15.625C15.0678 15.25 15.25 14.875 15.25 14.375C15.25 13.75 15.0678 13.375 14.7031 13C14.3385 12.625 13.8959 12.5 13.375 12.5ZM21.1875 13.9999L16.1875 18.9999L14.625 17.5L11.5 20.625V22.5H26.5V20L21.1875 13.9999Z" fill="#D5D5D5"/>
            </g>
            <path d="M47.3359 32.5833L41.625 28.495C41.3009 28.2631 41.0523 28 40.5625 28C39.8984 28 39.5 28.473 39.5 28.9167V31.6667H32.0625C31.4781 31.6667 31 32.0792 31 32.5833V34.4167C31 34.9208 31.4781 35.3333 32.0625 35.3333H39.5V38.0833C39.5 38.527 39.8984 39 40.5625 39C41.0523 39 41.3009 38.7369 41.625 38.505L47.3359 34.4167C47.7429 34.1307 48 33.9079 48 33.5C48 33.0921 47.7429 32.8703 47.3359 32.5833Z" fill="#64748F"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>
          <div class="portfolio__options_link">
            Move
          </div>
        </div>
        <div
          :style="{ marginLeft: 30 + 'px' }"
          class="collection__add_item"
          :class="{'collection__background': isActiveDelete}"
          @click="addNewCollection(3)"
        >
          <svg 
            class="portfolio__option_img_icon"
            width="65" height="60" viewBox="0 0 46 38" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V26.25C4 27.625 5.11929 28.75 6.5 28.75H31.5C32.8813 28.75 34 27.625 34 26.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#2F5269"/>
            <path d="M7.75 1.25C6.36925 1.25 5.25 2.375 5.25 3.75V21.25C5.25 22.625 6.36925 23.75 7.75 23.75H21.5H27.75H30.25C31.6313 23.75 32.75 22.625 32.75 21.25V10V6.25C32.75 4.875 31.6313 3.75 30.25 3.75H27.75H21.5H20.25L16.5 1.25H7.75Z" fill="#45708C"/>
            <path d="M32.75 17.5V7.5C32.75 6.125 31.6313 5 30.25 5H16.5H10.25H7.75C6.36925 5 5.25 6.125 5.25 7.5V17.5H32.75Z" fill="#BDC3C7"/>
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V16.25V17.5V25C4 26.375 5.11929 27.5 6.5 27.5H31.5C32.8813 27.5 34 26.375 34 25V17.5V16.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#64748F"/>
            <path d="M10.5625 10C10.1327 10 9.77475 10.1249 9.46875 10.3749C9.16275 10.7499 9 11.1249 9 11.4999V23.3749C9 23.8749 9.16275 24.125 9.46875 24.5C9.77475 24.75 10.1327 25 10.5625 25H25.25H26.5H27.4375C27.8675 25 28.225 24.75 28.5312 24.5C28.8375 24.125 29 23.8749 29 23.3749V11.4999C29 11.1249 28.8375 10.7499 28.5312 10.3749C28.225 10.1249 27.8675 10 27.4375 10H26.5H25.25H10.5625ZM10.5625 11.25H25.25H26.5H27.4375H27.6725C27.7375 11.375 27.75 11.3749 27.75 11.4999V23.3749C27.75 23.4999 27.7375 23.5 27.6725 23.625C27.6137 23.625 27.5225 23.75 27.4375 23.75H26.5H25.25H10.5625C10.4779 23.75 10.3932 23.625 10.3281 23.625C10.2695 23.5 10.25 23.4999 10.25 23.3749V11.4999C10.25 11.3749 10.2695 11.375 10.3281 11.25H10.5625ZM13.375 12.5C12.8541 12.5 12.4115 12.625 12.0469 13C11.6822 13.375 11.5 13.75 11.5 14.375C11.5 14.875 11.6822 15.25 12.0469 15.625C12.4115 16 12.8541 16.25 13.375 16.25C13.8959 16.25 14.3385 16 14.7031 15.625C15.0678 15.25 15.25 14.875 15.25 14.375C15.25 13.75 15.0678 13.375 14.7031 13C14.3385 12.625 13.8959 12.5 13.375 12.5ZM21.1875 13.9999L16.1875 18.9999L14.625 17.5L11.5 20.625V22.5H26.5V20L21.1875 13.9999Z" fill="#D5D5D5"/>
            </g>
            <path d="M37.6429 36.5556C37.6429 37.3536 38.2182 38 38.9286 38H44.0714C44.7818 38 45.3571 37.3536 45.3571 36.5556V27.8889H37.6429V36.5556ZM46 25.7222H43.75L43.1071 25H39.8929L39.25 25.7222H37V27.1667H46V25.7222Z" fill="#64748F"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>

          <div class="portfolio__options_link">
            Delete
          </div>
        </div>

        <!-- move collection mobile  -->
        <MoveCollection
          v-if="isMoveCollection && screenType === 'mobile'"
          @UpdateDatas="UpdateDatas"
          :dataCollectionFolder="dataCollectionFolder"
          :isMoveCollection="isMoveCollection"
          :isPath="isPath"
          :allImage="allImage" 
          :allFolder="allFolder"
        />

        <!-- delete_collection mobile -->
        <DeleteCollection
          v-if="isDeleteCollection && screenType === 'mobile'"
          @UpdateDatas="UpdateDatas"
          :dataCollectionFolder="dataCollectionFolder"
          :isPath="isPath"
          :allImage="allImage" 
          :allFolder="allFolder"
        />

      <!-- hide collection -->
        <div
          :style="{ marginLeft: 30 + 'px' }"
          class="collection__add_item"
          @click="addNewCollection(4)"
          :class="{'collection__background': isActiveHide}"
        >
          <svg 
            class="portfolio__option_img_icon"
            width="65" height="60" viewBox="0 0 51 38" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d)">
            <path d="M6.5 6C5.11925 6 4 7.125 4 8.5V26C4 27.375 5.11929 28.5 6.5 28.5H31.5C32.8813 28.5 34 27.375 34 26V8.5C34 7.125 32.8813 6 31.5 6H6.5Z" fill="#2F5269"/>
            <path d="M7.75 1.25C6.36925 1.25 5.25 2.375 5.25 3.75V21.25C5.25 22.625 6.36925 23.75 7.75 23.75H21.5H27.75H30.25C31.6313 23.75 32.75 22.625 32.75 21.25V10V6.25C32.75 4.875 31.6313 3.75 30.25 3.75H27.75H21.5H20.25L16.5 1.25H7.75Z" fill="#45708C"/>
            <path d="M32.75 17.5V7.5C32.75 6.125 31.6313 5 30.25 5H16.5H10.25H7.75C6.36925 5 5.25 6.125 5.25 7.5V17.5H32.75Z" fill="#BDC3C7"/>
            <path d="M6.5 6.25C5.11925 6.25 4 7.375 4 8.75V16.25V17.5V25C4 26.375 5.11929 27.5 6.5 27.5H31.5C32.8813 27.5 34 26.375 34 25V17.5V16.25V8.75C34 7.375 32.8813 6.25 31.5 6.25H6.5Z" fill="#64748F"/>
            <path d="M10.5625 10C10.1327 10 9.77475 10.1249 9.46875 10.3749C9.16275 10.7499 9 11.1249 9 11.4999V23.3749C9 23.8749 9.16275 24.125 9.46875 24.5C9.77475 24.75 10.1327 25 10.5625 25H25.25H26.5H27.4375C27.8675 25 28.225 24.75 28.5312 24.5C28.8375 24.125 29 23.8749 29 23.3749V11.4999C29 11.1249 28.8375 10.7499 28.5312 10.3749C28.225 10.1249 27.8675 10 27.4375 10H26.5H25.25H10.5625ZM10.5625 11.25H25.25H26.5H27.4375H27.6725C27.7375 11.375 27.75 11.3749 27.75 11.4999V23.3749C27.75 23.4999 27.7375 23.5 27.6725 23.625C27.6137 23.625 27.5225 23.75 27.4375 23.75H26.5H25.25H10.5625C10.4779 23.75 10.3932 23.625 10.3281 23.625C10.2695 23.5 10.25 23.4999 10.25 23.3749V11.4999C10.25 11.3749 10.2695 11.375 10.3281 11.25H10.5625ZM13.375 12.5C12.8541 12.5 12.4115 12.625 12.0469 13C11.6822 13.375 11.5 13.75 11.5 14.375C11.5 14.875 11.6822 15.25 12.0469 15.625C12.4115 16 12.8541 16.25 13.375 16.25C13.8959 16.25 14.3385 16 14.7031 15.625C15.0678 15.25 15.25 14.875 15.25 14.375C15.25 13.75 15.0678 13.375 14.7031 13C14.3385 12.625 13.8959 12.5 13.375 12.5ZM21.1875 13.9999L16.1875 18.9999L14.625 17.5L11.5 20.625V22.5H26.5V20L21.1875 13.9999Z" fill="#D5D5D5"/>
            </g>
            <path d="M45.2886 26.7879L43.8445 28.2751C43.291 28.123 42.7081 28.1228 42.1545 28.2746C41.6009 28.4264 41.0961 28.7247 40.6909 29.1397C40.2857 29.5547 39.9943 30.0716 39.846 30.6384C39.6978 31.2053 39.698 31.8021 39.8465 32.3689L37.5946 34.6665C36.5176 33.831 35.6201 32.7449 35 31.5C35.9309 29.6309 37.4583 28.1442 39.3285 27.287C41.1987 26.4298 43.299 26.2537 45.2805 26.7879H45.2886ZM48.3891 28.3335C49.4742 29.169 50.3717 30.2551 51 31.5C50.0685 33.3725 48.5384 34.8616 46.6647 35.7191C44.791 36.5765 42.687 36.7505 40.7032 36.2121L42.1474 34.7249C42.7009 34.877 43.2837 34.8772 43.8373 34.7254C44.3909 34.5736 44.8957 34.2753 45.3009 33.8603C45.7062 33.4453 45.9976 32.9284 46.1458 32.3616C46.294 31.7947 46.2939 31.1979 46.1453 30.6311L48.3972 28.3335H48.3891ZM48.1851 25L49.3437 26.1864L37.8067 38L36.6481 36.8136L48.1851 25V25Z" fill="#64748F"/>
            <defs>
            <filter id="filter0_d" x="0" y="0" width="38" height="38" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
            </filter>
            </defs>
          </svg>
          <div class="portfolio__options_link">
            Hide
          </div>
        </div>
      </div>
      <!-- add collection desktop -->
      <AddCollection
        v-if="isAddCollection && screenType !== 'mobile'"
        :dataCollectionFolder="dataCollectionFolder"
        :isPath="isPath"
        @UpdateDatas="UpdateDatas"
      />

      <!-- rename collection desktop -->
      <RenameCollection
        v-if="isRenameCollection && screenType !== 'mobile'"
        @UpdateDatas="UpdateDatas"
        :dataCollectionFolder="dataCollectionFolder"
        :isPath="isPath"
        :allImage="allImage" 
        :allFolder="allFolder"
      />

      <!-- move collection desktop -->
      <MoveCollection
        @UpdateDatas="UpdateDatas"
        v-if="isMoveCollection && screenType !== 'mobile'"
        :dataCollectionFolder="dataCollectionFolder"
        :isPath="isPath"
        :allImage="allImage" 
        :allFolder="allFolder"
      />

        <!-- delete collection componentisDeleteCollection -->
      <DeleteCollection
        v-if="isDeleteCollection && screenType !== 'mobile'"
        @UpdateDatas="UpdateDatas"
        :dataCollectionFolder="dataCollectionFolder"
        :isPath="isPath"
        :allImage="allImage" 
        :allFolder="allFolder"
        :isDeleteCollection="isDeleteCollection"
      />
      <!-- hide collection component -->
      <HideCollection
        v-if="isHideCollection"
        @UpdateDatas="UpdateDatas"
        :getNotHiddenPhoto="getNotHiddenPhoto"
        :getNotHiddenFolders="getNotHiddenFolders"
        :getHiddenPhoto="getHiddenPhoto"
        :getHiddenFolders="getHiddenFolders"
        :addCollectionFolder="true"
        :allCurrentFolder="allCurrentFolder"
        :dataCollectionFolder="dataCollectionFolder"
        :allFolderImage="allFolderImage"
        :allImage="allImage" 
        :allFolder="allFolder"
        :isPath="isPath"
        :isHideCollection="isHideCollection"
      />
    </div>
  </div>
</template>

<script>
import { Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import { FormGroupInput as FgInput } from '~/components'
export default {

  components: {
    FgInput,
    HideCollection: () => import('~/components/custom/portfolio/Collection/Hide'),
    DeleteCollection: () => import('~/components/custom/portfolio/Collection/Delete'),
    MoveCollection: () => import('~/components/custom/portfolio/Collection/Move'),
    RenameCollection: () => import('~/components/custom/portfolio/Collection/Rename'),
    AddCollection: () => import('~/components/custom/portfolio/Collection/CreateFolder'),
  },

  props: [
    'addCollectionFolder', 
    'allCurrentFolder', 
    'dataCollectionFolder', 
    'allFolderImage',
    'allImage',
    'allFolder',
    'isPath',
    'getNotHiddenPhoto',
    'getHiddenFolders',
    'getNotHiddenFolders',
    'getHiddenPhoto'
    ],

  data () {
    return {
      isLoading: false,

      isAddCollection: false,
      isRenameCollection: false,
      isDeleteCollection: false,
      isMoveCollection: false,
      isHideCollection: false,

      isActiveFolder: false,
      isActiveRename: false,
      isActiveMove: false,
      isActiveDelete: false,
      isActiveHide: false,
      windowWidth: 0,
    }
  },

  methods: {
    addNewCollection (data) {
      switch (data) {
        case 0:
          this.isActiveFolder === false ?
          this.isActiveFolder = true : 
          this.isActiveFolder = false

          this.isAddCollection === true ?
          this.isAddCollection = false : 
          this.isAddCollection = true

          this.isActiveHide = false
          this.isHideCollection = false
          this.isActiveDelete = false
          this.isDeleteCollection = false
          this.isHideCollection = false
          this.isMoveCollection = false
          this.isActiveMove = false
          this.isRenameCollection = false
          this.isActiveRename = false

          break
        case 1:
          this.isActiveRename === false ?
          this.isActiveRename = true : 
          this.isActiveRename = false

          this.isRenameCollection === true ?
          this.isRenameCollection = false : 
          this.isRenameCollection = true

          this.isActiveHide = false
          this.isHideCollection = false
          this.isActiveFolder = false
          this.isAddCollection = false
          this.isActiveDelete = false
          this.isDeleteCollection = false
          this.isHideCollection = false
          this.isMoveCollection = false
          this.isActiveMove = false

          break
        case 2:
          this.isActiveMove === false ?
          this.isActiveMove = true : 
          this.isActiveMove = false

          this.isMoveCollection === true ?
          this.isMoveCollection = false : 
          this.isMoveCollection = true

          this.isActiveHide = false
          this.isHideCollection = false
          this.isRenameCollection = false
          this.isActiveRename = false
          this.isActiveFolder = false
          this.isAddCollection = false
          this.isActiveDelete = false
          this.isDeleteCollection = false

          break
        case 3:
          this.isActiveDelete === false ?
          this.isActiveDelete = true : 
          this.isActiveDelete = false

          this.isDeleteCollection === true ?
          this.isDeleteCollection = false : 
          this.isDeleteCollection = true

          this.isActiveHide = false
          this.isHideCollection = false
          this.isMoveCollection = false
          this.isActiveMove = false
          this.isRenameCollection = false
          this.isActiveRename = false
          this.isActiveFolder = false
          this.isAddCollection = false
          break
        case 4:
          this.isActiveHide === false ?
          this.isActiveHide = true : 
          this.isActiveHide = false

          this.isHideCollection === true ?
          this.isHideCollection = false : 
          this.isHideCollection = true

          this.isDeleteCollection = false
          this.isActiveDelete = false
          this.isMoveCollection = false
          this.isActiveMove = false
          this.isRenameCollection = false
          this.isActiveRename = false
          this.isActiveFolder = false
          this.isAddCollection = false

          break
        default:
          break
      }
    },

    UpdateDatas (path) {
      this.$emit('UpdateData', path)
    }
  },

  computed: {
    screenType () {
      const vw = this.windowWidth

      if (vw < 1300 && vw > 768) {
        return 'tablet'
      } else if (vw < 420) {
        return 'mobile'
      } else {
        return 'desktop'
      }
    },
  },

  mounted () {
    this.$nextTick(_ => {
      this.windowWidth = window.innerWidth
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
  },
}
</script>

<style lang="scss">
.el-select .el-input .el-input__inner {
  background-color: #F5F5F5;
  border: 1px solid rgb(218, 217, 217);
  color: #000;
  width: 180px
}
.input--short {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-group .form-control {
  margin-top: .5rem;
  padding: 8px;
}

.el-select .el-input .el-select__caret {
  color: rgb(36, 36, 36) !important;
}

</style>
  
<style lang="scss" scoped>
.collection__container {
  .portfolio__options_item {
    .collection__add_container {
      display: flex;
    }
  }
}
//desktop button
.button__hide_image {
  margin-left: .8rem;
}

.button_delete_image {
  margin-left: .8rem;
}

.button_move_image {
  margin-left: .8rem;
}

.button_rename_image {
  margin-left: .8rem;
}

.button_add_image {
  margin-left: .4rem;
}

.collection__add_folder {
  display: flex;

  .portfolio__watermark_select {
    display: flex;

    .add_folder-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .collection__add_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;

    .portfolio__option_img_icon {
      display: flex;
      justify-content: flex;
      align-items: center;
      margin-bottom: .5rem;
      cursor: pointer;
    }
  }
}

.collection__add_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 2rem;
}

.collection__add_delete {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.collection__add_hide {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.collection__add_container-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .portfolio__option_img_icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: .5rem;
    // width: 45px;
    cursor: pointer;
  }
}

.portfolio__watermark_select {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem .1rem .1rem .1rem;

  .input--short {
    height: 30px;

    .form-control {
      height: 12px;
    }
  }
}

.portfolio__options_link {
  font-weight: bold;
  cursor: pointer;
}

.portfolio__options_link:hover {
  font-weight: bold;
  cursor: pointer;
}

.collection__add_location {
  display: flex;

  .collection__add_location-checkbox {
    margin-left: 1.5rem;
  }
}

.header__table {
  margin-top: .5rem;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 2rem;
}

.collection__background {
  border-bottom: 3px solid #64748F;
}

.collection__add {
  margin-left: 1.5rem;
}

//tablet
@media (max-width: 960px) {
  .collection__add_item {
    text-align: center;
    margin-left: 1.2rem !important;
  }
}

@media (max-width: 768px) {
  .collection__add_item {
    text-align: center;
    margin-left: 1.2rem !important;
    margin-top: .8rem;
  }

  .collection__add_container {
    // flex-wrap: wrap;
  }
}

@media (max-width: 560px) {
  .collection__add_container {
    flex-wrap: wrap;
  }
}
//mobile
@media (max-width: 420px) {
  .portfolio__options_item {
    .collection__add_container {
      max-width: 370px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .collection__add_item {
    display: flex;
    width: 150px;
    margin-right: .4rem;
    margin-left: .4rem;
    margin-top: 1.3rem !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-left: 1px !important;
    margin-top: 2.5rem;

    .portfolio__option_img_icon {
      width: 100px;
      height: 120px;
    }

    .portfolio__options_link {
      display: flex;
      text-align: center;
    }
  }

  .collection__add_delete {
    width: 320px !important;
    display: flex;
  }

  .collection__add_delete {
    .portfolio__watermark_select {
      display: flex;
      justify-content: flex-end !important;
      align-items: flex-end;
      width: 340px;
    }
  }
}
</style>