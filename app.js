// spinner.
const spinner = () => {
    document.getElementById('details-container').classList.add('hidden')
    document.getElementById('spinner').classList.remove('hidden')
    setTimeout(() => {
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('details-container').classList.remove('hidden')
    }, 2000)
}

const loadAllCategories = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
    const data = await response.json();
    displayAllCategories(data.categories);
}


const loadAllPets = async (status) => {
    const response = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
    const data = await response.json();
    displayAllPets(data.pets, status);
}


const displayAllCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');
    categories.forEach((category) => {
        const div = document.createElement('div');
        div.setAttribute('onclick', `loadByCategory('${category.category}'); spinner()`)
        div.classList = `py-3 border rounded-full cursor-pointer category-div ${category.category}`
        div.innerHTML = `
                    <div class="flex items-center  justify-center gap-4">
                        <img class="w-12" src="${category.category_icon}"
                            alt="${category.category}">
                        <span class="text-2xl font-semibold">${category.category}</span>
                    </div>
        `;
        categoryContainer.append(div)
    })
}



const displayAllPets = (pets, status) => {
    const petContainer = document.getElementById('pet-container');
    // sort
    if (status) {
        pets.sort((a, b) => b.price - a.price);
        petContainer.classList.add('grid');

        const classes = document.getElementsByClassName(`category-div`);
        for (let clas of classes) {
            clas.classList.remove('border-sky-600', 'bg-sky-50')
        }
    }

    petContainer.innerHTML = ''
    pets.forEach((pet) => {
        const { pet_name, breed, category, date_of_birth, price, image, gender, vaccinated_status, pet_details } = pet;



        const div = document.createElement('div');
        div.classList = 'p-5 border rounded-xl'
        div.innerHTML = `
                        <!-- img  -->
                        <div>
                            <img class="rounded-lg w-full h-40 md:h-32 lg:h-56" src="${image}" alt="">
                        </div>
                        <!-- text  -->
                        <div class="mt-6">
                            <h4 class="text-xl font-semibold">${pet_name ? pet_name : 'Not Available'}</h4>
                            <div>
                                <i class="fa-solid fa-border-all"></i>
                                <span>Breed: ${breed ? breed : 'Not Available'}</span>
                            </div>
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                                <span>Birth: ${date_of_birth ? date_of_birth : 'Not Available'}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-venus"></i>
                                <span>Gender: ${gender ? gender : 'Not Available'}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-dollar-sign"></i>
                                <span>Price : ${price ? price : 'Not Available'}$</span>
                            </div>
                        </div>
                        <!-- divider -->
                        <div class="divider"></div>
                        <!-- CTA  -->
                        <div class="flex justify-between items-center">
                            <button onclick="displayLikedPets('${image}')" class="border py-1 px-2 rounded-lg font-bold text-lg"><i
                                    class="fa-regular fa-thumbs-up"></i></button>
                            <button  onclick="adopting(this)" class="adopt-btn border py-1 px-2 rounded-lg text-sky-600 font-bold text-lg">Adopt</button>
                            <button  class="details-btn border py-1 px-2 rounded-lg text-sky-600 font-bold text-lg">Details</button>
                        </div>
        `;

        //modal click event
        div.querySelector('.details-btn').addEventListener('click', () => {
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
             <div>
                        <img class="rounded-lg w-full h-40 md:h-32 lg:h-56" src="${image}" alt="">
                    </div>
                    <!-- text  -->
                    <div class="mt-4">
                        <h4 class="text-xl font-semibold">${pet_name ? pet_name : 'Not Available'}</h4>
                        <div class="flex gap-5">
                            <div>
                                <div>
                                    <i class="fa-solid fa-border-all"></i>
                                    <span>Breed: ${breed ? breed : 'Not Available'}</span>
                                </div>
    
                                <div>
                                    <i class="fa-solid fa-venus"></i>
                                    <span>Gender: ${gender ? gender : 'Not Available'}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-venus"></i>
                                    <span>Vaccinated Status: ${vaccinated_status ? vaccinated_status : 'Not Available'}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i class="fa-regular fa-calendar"></i>
                                    <span>Birth: ${date_of_birth ? date_of_birth : 'Not Available'}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <span>Price : ${price ? price : 'Not Available'}$</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- divider -->
                    <div class="divider"></div>
                    <!-- description -->
                    <div>
                        <h5 class="font-bold">Details Information</h5>
                        <p>${pet_details ? pet_details : 'Not Available'}</P>
    
                    </div>
            `
            my_modal_5.showModal()
        })



        petContainer.append(div)

    })



}


const displayLikedPets = (img) => {
    const likedContainer = document.getElementById('liked-pet')
    const likedImage = document.createElement('img');
    likedImage.setAttribute('src', img);
    likedImage.classList = 'rounded-lg'
    likedContainer.append(likedImage)
}

loadAllCategories()
loadAllPets()


// category buttons event 
const loadByCategory = async (category, status) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
    const data = await response.json();
    displayByCategory(data.data, status);

}

const displayByCategory = (pets, status) => {
    // sort
    if (status) {
        pets.sort((a, b) => b.price - a.price);

    }


    const petContainer = document.getElementById('pet-container');
    petContainer.classList.add('grid')
    petContainer.innerHTML = '';
    pets.forEach((pet) => {
        const { pet_name, breed, category, date_of_birth, price, image, gender, vaccinated_status, pet_details } = pet;
        //---------------
        const classes = document.getElementsByClassName(`category-div`);
        for (let clas of classes) {
            clas.classList.remove('border-sky-600', 'bg-sky-50')
        }
        document.querySelector(`.${pet.category}`).classList.add('border-sky-600', 'bg-sky-50');
        //---------------

        const div = document.createElement('div');
        div.classList = 'p-5 border rounded-xl'
        div.innerHTML = `
                        <!-- img  -->
                        <div>
                            <img class="rounded-lg w-full h-40 md:h-32 lg:h-56" src="${image}" alt="">
                        </div>
                        <!-- text  -->
                        <div class="mt-6">
                            <h4 class="text-xl font-semibold">${pet_name ? pet_name : 'Not Available'}</h4>
                            <div>
                                <i class="fa-solid fa-border-all"></i>
                                <span>Breed: ${breed ? breed : 'Not Available'}</span>
                            </div>
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                                <span>Birth: ${date_of_birth ? date_of_birth : 'Not Available'}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-venus"></i>
                                <span>Gender: ${gender ? gender : 'Not Available'}</span>
                            </div>
                            <div>
                                <i class="fa-solid fa-dollar-sign"></i>
                                <span>Price : ${price ? price : 'Not Available'}$</span>
                            </div>
                        </div>
                        <!-- divider -->
                        <div class="divider"></div>
                        <!-- CTA  -->
                        <div class="flex justify-between items-center">
                            <button onclick="displayLikedPets('${image}')" class="border py-1 px-2 rounded-lg font-bold text-lg"><i
                                    class="fa-regular fa-thumbs-up"></i></button>
                            <button  onclick="adopting(this)" class="border py-1 px-2 rounded-lg text-sky-600 font-bold text-lg">Adopt</button>
                            <button  class="details-btn border py-1 px-2 rounded-lg text-sky-600 font-bold text-lg">Details</button>
                        </div>
        `;
        //modal click event
        div.querySelector('.details-btn').addEventListener('click', () => {
            const modalContent = document.getElementById('modal-content');
            modalContent.innerHTML = `
             <div>
                        <img class="rounded-lg w-full h-40 md:h-32 lg:h-56" src="${image}" alt="">
                    </div>
                    <!-- text  -->
                    <div class="mt-4">
                        <h4 class="text-xl font-semibold">${pet_name ? pet_name : 'Not Available'}</h4>
                        <div class="flex gap-5">
                            <div>
                                <div>
                                    <i class="fa-solid fa-border-all"></i>
                                    <span>Breed: ${breed ? breed : 'Not Available'}</span>
                                </div>
    
                                <div>
                                    <i class="fa-solid fa-venus"></i>
                                    <span>Gender: ${gender ? gender : 'Not Available'}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-venus"></i>
                                    <span>Vaccinated Status: ${vaccinated_status ? vaccinated_status : 'Not Available'}</span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <i class="fa-regular fa-calendar"></i>
                                    <span>Birth: ${date_of_birth ? date_of_birth : 'Not Available'}</span>
                                </div>
                                <div>
                                    <i class="fa-solid fa-dollar-sign"></i>
                                    <span>Price : ${price ? price : 'Not Available'}$</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- divider -->
                    <div class="divider"></div>
                    <!-- description -->
                    <div>
                        <h5 class="font-bold">Details Information</h5>
                        <p>${pet_details ? pet_details : 'Not Available'}</P>
    
                    </div>
            `
            my_modal_5.showModal()
        })



        petContainer.append(div)

    });

    //-------------------------
    // empty category
    if (pets.length == 0) {
        //______________________
        const classes = document.getElementsByClassName(`category-div`);
        for (let clas of classes) {
            clas.classList.remove('border-sky-600', 'bg-sky-50')
        }
        document.querySelector(`.Bird`).classList.add('border-sky-600', 'bg-sky-50');
        //______________________
        petContainer.classList.remove('grid')
        petContainer.innerHTML = `
            <figure class="px-10 pt-10">
        <img src="https://img.icons8.com/?size=100&id=t3NmJwdPU7oB&format=png&color=000000" alt="Shoes"
            class="mx-auto" />
    </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title font-bold">No Information Available</h2>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking
            at
            its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
        `;

    }
    //-------------------------

}


// countDown function
function adopting(btn) {
    let counter = 3;
    my_modal_6.showModal();
    document.getElementById('number-count').innerText = counter;
    const countDown = setInterval(() => {
        counter--;
        if (counter >= 1) {
            document.getElementById('number-count').innerText = counter;
        }
        if (counter === 1) {
            clearInterval(countDown);
            setTimeout(() => {
                document.getElementById('my_modal_6').close();
                btn.innerText = 'Adopted';
                btn.setAttribute('disabled', 'true');
                btn.classList.add('text-green-500')
            }, 1000);
        }
    }, 1000);
}
