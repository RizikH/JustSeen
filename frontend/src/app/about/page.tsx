export default function About() {

    return(
        <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full min-h-(--page-height) px-[4.5rem]">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg text-gray-600 mb-8">
                    Welcome to our movie database! We are passionate about movies and dedicated to providing you with the latest information on your favorite films.
                </p>
                <p className="text-lg text-gray-600">
                    Our team works tirelessly to ensure that you have access to accurate and up-to-date movie details, including cast, crew, and release dates.
                </p>
            </div>
        </div>
    );
}