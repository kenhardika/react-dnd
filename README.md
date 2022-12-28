## React Drag and Drop and Duplicate Component

Project terdiri dari Parent page yaitu FunctionIndex,
pada Page FunctionIndex/ClassIndex, disini tempat dimana pusat state management berada.
Functions yang mengatur state utama dari project diatur pada halaman index.

Untuk Function Component kita menggunakan useReducer, useReducer adalah sebuah fungsi yang disediakan oleh React yang membantu kita untuk mengelola state aplikasi kita dengan lebih mudah. 
Fungsi ini dapat digunakan bersama dengan komponen React seperti useState. 

Biasanya, kita akan menggunakan useReducer ketika state aplikasi kita mulai menjadi lebih kompleks 
dan memerlukan lebih banyak logika untuk mengelolanya.

Dalam project ini reducer digunakan untuk mengelola CRUD dari komponen section, list, dan image.

Selain itu pada project ini juga digunakan library react-beautiful-dnd. React-beautiful-dnd adalah sebuah 
library untuk membuat fitur drag-and-drop pada aplikasi React. Drag-and-drop adalah sebuah fitur yang memungkinkan 
pengguna untuk menyeret dan menempatkan elemen pada aplikasi kita dengan menggunakan mouse atau touchpad.

Library ini memungkinkan kita untuk dengan mudah membuat fitur drag-and-drop pada aplikasi React kita. 
Selain itu, library ini juga memiliki desain yang indah dan intuitif, sehingga mempermudah pengguna 
untuk menggunakan fitur tersebut pada aplikasi kita. 

Drag and drop pada project ini dapat digunakan pada bagian komponen Section dan subkomponen List.

Untuk komponen utama, yaitu komponen Section, berisi beberapa subkomponen yaitu title, image, dan list.
masing masing dari title, image, dan list memiliki fungsi sifat yang dasarnya sama, yaitu dapat diubah(edit), bertambah, dan dihapus. 
semua dari fungsi fungsi tersebut pada functional component diatur dalam state yang dimanage dengan useReducer.

Pada subkomponen title, dapat diubah dan disimpan suatu form input dalam bentuk text.

Pada subkomponen image, digunakan input type files yang berfungsi untuk mengupload image. Subkomponen ini menggunakan Library react-cropper yaitu library yang digunakan untuk memudahkan membuat cropper pada aplikasi React. Cropper adalah sebuah fitur yang memungkinkan pengguna untuk memotong gambar sesuai dengan keinginan. 

Pada subkomponen List, terdapat fungsi create, edit, dan delete, serta memiliki sifat drag and drop.
Jadi urutan/order dari subkomponen list dapat diatur/dipindahkan secara intuitif.

Selain itu setiap component telah diatur menggunakan memo untuk functional component dan shouldComponentUpdate() untuk Class component. Memo adalah sebuah fungsi yang disediakan oleh React untuk men-cache komponen dan mencegah re-rendering yang tidak diperlukan. Secara umum, memo adalah sebuah fungsi yang sangat berguna untuk meningkatkan performa aplikasi kita dengan cara yang mudah dan efisien.


Penjelasan Library:
react-beautiful-dnd 
<DragAndDropContext> - Membungkus/Wrap area komponen dari aplikasi yang akan menggunakan fitur drag and drop
<Droppable /> - sebuah area yang dapat dijadikan tempat "drop" komponen yang ditarik (drag). Komponen ini berisi <Draggable/>.
<Draggable /> - sebuah area yang dapat ditarik dan dipindahkan posisinya

react-cropper
<CropperLayer> / <CropperLayerClass> - komponen untuk menempatkan fungsi dari library react-cropper
<Cropper> - komponen dari library react-cropper yang berfungsi untuk melakukan cropping sesuai parameter yang tersedia

komponen
<ModalLayer> - komponen ini berfungsi sebagai container dari react-cropper, berisi image yang telah dicrop, button input choose file upload image, crop, & cancel. 
  Props: 
    -onHide yang berfungsi untuk mengatur state show modal.

<FormInputSection> / <FormInputClass> - komponen ini berguna untuk input data berupa form dalam bentuk text
  Props:  
    -

<ImageSection> / <ImageClass> - komponen ini berguna sebagai container dari image yang diupload dan telah dicrop oleh react-cropper.
<ListSection> / <ListClass> - komponen ini berguna sebagai container yang berisi List FormInput yang dapat diubah & delete tiap formnya. Selain itu component ini dapat dipindahkan posisi urutan form tersebut dengan melakukan drag and drop.
<InputSection> / <InputSectionClass> - komponen ini adalah container yang berisi kumpulan subkomponen seperti <FormInput>, <ImageSection>, dan <ListSection>
Komponen ini memiliki fungsi drag and drop yang dapat mengubah order/urutan posisi dari masing masing komponen <InputSection>.


