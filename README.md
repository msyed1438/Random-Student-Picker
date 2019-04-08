# Random Student Picker
This repo builds upon kapolyak/Random-Student-Picker. Added functionality includes a "Hat Shuffle" inspired UI with CSS animations, in app settings modal for simpler adjustment to the class list, and improved winner modal implemented with React Portal. 

![](https://github.com/stephenjmark/Random-Student-Picker/blob/master/studentpicker.gif)

## Usage

### Instal Dependencies

From within the root directory:

```
npm install
```

### Run the Application Locally

```
npm run build
npm start
```
Then access the application at (http://localhost:4000).

#### Setup
- Navigate to settings by click [s] in top right corner
- Toggle available students
- Closing settings modal will reset board

#### Game Play
- Student names get hidden behind cups
- Click "Randomize Class" to mix cups 
- Select cup from newly shuffled set
- Next presenter and date of presentation is revealed 


### For Development

```
npm run react-dev
npm run server-dev
```


