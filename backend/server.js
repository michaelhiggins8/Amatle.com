

const express = require('express');
const server = express();

//npm
const dotenv = require('dotenv');
dotenv.config();
const axios = require('axios');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
server.use(cookieParser());
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const pdfParse = require("pdf-parse");
const OpenAI = require("openai");
const openai = new OpenAI();
const { Parser } = require('json2csv');
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { Document } = require('@langchain/core/documents');
const { OpenAIEmbeddings } = require("@langchain/openai");
const { ChatOpenAI } =  require("@langchain/openai");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const nodemailer = require("nodemailer");




const stripe = require('stripe')(process.env.STRIPE_KEY);

// middle ware

const cors = require('cors');
server.use(cors({

origin: [process.env.FRONTEND_ORIGIN,"https://amatle.com"],
credentials:true
}));

server.options("*", cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));

const morgan = require('morgan');
server.use(morgan('dev'));
server.use(express.json());




// postgres pool



const {Pool} = require('pg');


const pool = new Pool({


user:process.env.PG_USER,
host:process.env.PG_HOST,
database:process.env.PG_DATABASE,
password:process.env.PG_PASSWORD,
port:process.env.PG_PORT,
ssl: {
  rejectUnauthorized: false
}


})




//repeat functions


function getTokenData(req){



    try {
        const token = req.cookies.auth_token; 
        console.log("Token from cookie:", req.cookies.auth_token);
        //console.log("Secret Key:", process.env.SECRET_KEY);

        if (!token) {
            console.log("No token found in cookies.");
            return null; 
        }

        console.log("JWT Secret in verification:", process.env.SECRET_KEY);
console.log("Token being verified:", token);

        
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        
        //console.log("Decoded Token:", decoded); 

        return decoded; 

    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        console.log("Token: ", req.cookies.auth_token);
        return null; 
    }


}





//routes


// sign up page


server.get("/queryCitySuggestions",async (req,res)=>{

    const cityName = req.query.cityName;

    if(!cityName){

        return res.status(400).json({'message':'cityName not recived'});
    }

    let respoz;
    try{
            respoz = await axios.get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${cityName}&types=(cities)&components=country:us&key=${process.env.GOOGLE_MAPS_SUGGESTIONS_API_CODE}`
        );
    }catch(err){

        return res.status(400).json({'message':'could not access google api'})
    }




    const predictions = respoz.data.predictions;
    if(!predictions){
        return res.status(400).json({'message':'predictions not found'})

    }

    res.json({predictions});
})





server.post("/makeAccount",async(req,res)=>{


    const city_name = req.body.signUpData.city_name;
    const city_id = req.body.signUpData.city_id;
    const email = req.body.signUpData.email;
    const association_name = req.body.signUpData.association_name;
    const number_of_units = req.body.signUpData.number_of_units;
    const password = req.body.signUpData.password;

    if(!city_name || !city_id || !email || !association_name || !number_of_units || !password) {

        return res.status(400).json({'message':'data not recived'})
    }


   const hashedPassword = await bcrypt.hash(password,10);



   let client
   try{


        client = await pool.connect();
        await client.query('BEGIN');
        
        const a = await client.query(
        `INSERT INTO associations(
        association_name,admin_email,city,city_id,number_of_units,password
        ) VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
        [association_name,email,city_name,city_id,parseInt(number_of_units, 10),hashedPassword])

        const association_id = a.rows[0].id;
        
        const b = await client.query(
            `INSERT INTO users(association_id,role,email,password) 
             VALUES($1,$2,$3,$4)`,
             [association_id,'admin',email,hashedPassword]);

        await client.query('COMMIT');
        client.release();
   
   
   
   
    }catch(err){
    console.log("database error");
    if (client) {
        await client.query('ROLLBACK');
        client.release();
    }
        return res.status(400).json({'message':'database error'});

   }

    return res.status(200).json({ 'message': 'Account created successfully' });








})

















// log in


server.post("/logIn",async(req,res)=>{


    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password){
        return res.status(400).json({"message":"no email or password received from frontend"});
    }

    // check if valid log in
    let responzOfPasswordFromDatabase;
    try{
     responzOfPasswordFromDatabase = await pool.query(`SELECT password,role,id,association_id FROM users WHERE email = $1`,[email]);
    }catch(err){
        return res.status(400).json({"message":"password not recived from database"});
    }

    if(responzOfPasswordFromDatabase.rows.length === 0){

        return res.status(400).json({"message":"invalid email or password"});

    }
    
    const passwordFromDatabase = responzOfPasswordFromDatabase.rows[0].password;

    

    const isValid = await bcrypt.compare(password,passwordFromDatabase);
    
    if(!isValid){

        return res.status(400).json({"message":"invalid password"});
    }

    // if valid log in, make token
    const role = responzOfPasswordFromDatabase.rows[0].role;
    const id = responzOfPasswordFromDatabase.rows[0].id;
    const association_id = responzOfPasswordFromDatabase.rows[0].association_id;


    const payload = {role,id,association_id};
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload,secretKey,{ expiresIn: "7d" });
    // if valid log in send token

    console.log(token);
   res.cookie("auth_token",token,
        {

            httpOnly:process.env.HTTP_ONLY === "true",
            secure:process.env.SECURE === "true",
            sameSite:process.env.SAME_SITE,
            maxAge: 7 * 24 * 60 * 60 * 1000




        });
        


    res.status(200).json({'message':'log in complete'});



});





// navbar

server.get("/queryUserProfile", (req,res)=>{



    const data = getTokenData(req);
    if(data){


    return res.status(200).json({'message':data.role})


    }else{

        return res.status(200).json({'message':null});

    }


})

















// doc update


server.post("/sendPdf",upload.array("pdf"),async(req,res)=>{



    const tokenData =  getTokenData(req); 
    const association_id = tokenData.association_id;

    const files = req.files;
    console.log(files);
    

    // create array of ojexts with file compute content
    const contents = []
    
    for(let i = 0; i< files.length;i++){


        contents.push({
            
            
            "originalname":files[i].originalname,
            
            "buffer":fs.readFileSync(files[i].path)
        
        }
        
        );
        console.log("ON:",files[i].originalname);

    
    }




    // create array of ojexts with file TEXT content


    let contentsTxt = []
for (let i = 0; i<contents.length;i++){



    
    let holder = await pdfParse(contents[i].buffer);
    contentsTxt.push({
        
        
       "originalname":  contents[i].originalname,
        
        
        "txt": holder.text});
        




}



// CHUNK into "document" object of chunks with meta data attribute

const docs = contentsTxt.map(content => new Document({
    pageContent: content.txt, 
    metadata: { filename: content.originalname } 
}));




const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const allSplits = await splitter.splitDocuments(docs);
  console.log("allSplits: ",allSplits);





//convert chunks into array of objects with Embeddings



  const embeddingsModel = new OpenAIEmbeddings();






  const embeddingsContainer = [];

for (let i = 0; i <allSplits.length;i++){


    const embedding = await embeddingsModel.embedQuery(allSplits[i].pageContent);
       

    embeddingsContainer.push({

        "finalEmbedding":embedding,
        "originalname": allSplits[i].metadata.filename,
        "currentContent":allSplits[i].pageContent
    
    })

}



console.log(embeddingsContainer);



 
  

const client = await pool.connect();
  
try {
  
  await client.query('BEGIN');

  //start logic space




  const response =  await client.query(`INSERT INTO documents(association_id,file_name,file_path) VALUES ($1,$2,$3) RETURNING id`,[association_id,embeddingsContainer[0].originalname,'n/a'])
  


  const insertedId = response.rows[0].id;
  console.log(insertedId);


  for(let i = 0;i<embeddingsContainer.length;i++){

 const response =  await client.query(
    `INSERT INTO document_vectors(association_id,document_id,embedding,metadata) VALUES ($1,$2,$3,$4)`,
    [association_id,insertedId, "["+embeddingsContainer[i].finalEmbedding.join(",")+ "]",JSON.stringify({content: embeddingsContainer[i].currentContent})])
    console.log("emb:",embeddingsContainer[i].finalEmbedding);


  }


  //end logic space

await client.query('COMMIT');
} catch (err) {
  
  await client.query('ROLLBACK');
  console.error('Error processing data', err);
} finally {
  
  client.release();
}


res.status(200).json({"message":"added"})










    




})














// Create once and reuse
const embeddings = new OpenAIEmbeddings();
const model = new ChatOpenAI({ model: "gpt-4" });

// Route
server.post("/makeQuery", async (req, res) => {
  try {
    const user_data = getTokenData(req);
    const association_id = user_data.association_id;

    const question = req.body.query;

    // Validate input
    if (typeof question !== "string" || question.trim() === "") {
      return res.status(400).json({ error: "Invalid query" });
    }

    // Convert query to embedding
    const embeddingOfQuery = await embeddings.embedQuery(question);

    // Find closest embeddings to query
    const closestEmbeddings = await pool.query(
      `SELECT metadata FROM document_vectors 
       WHERE association_id = $1 
       ORDER BY embedding <-> $2 
       LIMIT 5;`,
      [association_id, JSON.stringify(embeddingOfQuery)]
    );

    const contentofClosestEmbeddings = closestEmbeddings.rows.map(
      (item) => item.metadata.content
    );

    const contentofClosestEmbeddingsString = contentofClosestEmbeddings.join(
      "***->Next Rule: "
    );

    // Create prompt
    const systemMessage = `You are a help desk assistant for a homeowners association (HOA)...[full prompt here, unchanged]`;

    const userMessage = `Help answer the following resident question based strictly on the provided context.

###Question: {question}

### context: {context}`;

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemMessage],
      ["user", userMessage],
    ]);

    const queryToSend = await promptTemplate.invoke({
      question,
      context: contentofClosestEmbeddingsString,
    });

    // Query OpenAI
    const answer = await model.invoke(queryToSend);

    // Respond
    res.status(200).json({ message: answer.content });
  } catch (err) {
    console.error("Error in /makeQuery:", err);
    res.status(500).json({ error: "Server error" });
  }
});





server.post("/makePayment", async (req, res) => {
    try {
      const paymentMethodId = req.body.paymentMethodId;
      console.log("Received PaymentMethodID:", paymentMethodId);
  
      const tokenData = getTokenData(req);
      console.log("Token Data:", tokenData);
  
      // ✅ First, check if the PaymentMethod exists
      const retrievedPM = await stripe.paymentMethods.retrieve(paymentMethodId);
      console.log("Retrieved PaymentMethod:", retrievedPM);
  
      // ✅ Create customer
      const customer = await stripe.customers.create({
        metadata: { association_id: tokenData.association_id },
      });
      console.log("Customer created:", customer.id);
  
      // ✅ Attach the PaymentMethod
      await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
      console.log("PaymentMethod attached:", paymentMethodId);
  
      // ✅ Make it the default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: { default_payment_method: paymentMethodId },
      });
  
      // ✅ Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: 'price_1QuMqiBfYC9JRgFHB92SbeDt' }],
      });
  
      console.log("Subscription created:", subscription.id);
      res.json({ subscription });
  
    } catch (error) {
      console.error("Error in /makePayment:", error);
      res.status(500).json({ error: error.message });
    }
  });
  












  // upload member users


  server.get("/generateTemplate",async(req,res)=>{




    const data = getTokenData(req);
   
    const association_id = data.association_id;
    const result = await pool.query(`SELECT number_of_units FROM associations WHERE id = $1`,[association_id])
    const number_of_units = result.rows[0].number_of_units;
    let numRows = number_of_units;
    const members = [];
    for (let i = 1; i <= numRows; i++) {
        members.push({ resident_number: i, email: '' ,cell_phone_number:''}); 


    }



const json2csvParser = new Parser();
const csv = json2csvParser.parse(members);

  res.header('Content-Type', 'text/csv');
  res.attachment('members_template.csv');  
  res.send(csv);


  });





  ///*

  function syncUsersWithResult(result, users) {
    // 1) Gather all emails from 'result' (ignoring blanks).
    const resultEmails = new Set(
      result
        .map(r => r.email.trim())          // trim whitespace
        .filter(email => email !== '')     // exclude blank emails
    );
  
    // 2) Gather all emails from 'users'.
    const existingEmails = new Set(users.map(u => u.email));
  
    // 3) Filter out from 'users' any user whose email isn't in 'resultEmails'.
    //    This removes users no longer in 'result'.
    const updatedUsers = users.filter(u => resultEmails.has(u.email));
  
    // 4) For each non-empty email in 'resultEmails', if it's not in 'existingEmails',
    //    create a new user. This also ensures duplicates in 'result' won't be added twice.
    for (const email of resultEmails) {
      if (!existingEmails.has(email)) {
        updatedUsers.push({
          email,
          role: 'member',
          // For newly created users, set other fields to null
          id: null,
          association_id: null,
          password: null,
          created_at: null
        });
      }
    }
  
    return updatedUsers;
  }
  
 
  

//*/






















const templateUploadMulter = multer({ dest: "uploads/" });

const csvParser = require("csv-parser");
//const { console } = require('inspector');
//const { Embeddings } = require('openai/resources/embeddings.mjs');
//const { console } = require('inspector');
//const { console } = require('inspector');

server.post("/uploadTemplate",templateUploadMulter.single('file'),async(req,res)=>{


   



    if (!req.file) {
      return res.status(400).send({'message':'File not uploaded'});
    }
  

    const filePath = req.file.path;
    const fileStreamObj = fs.createReadStream(filePath);


   
      const result = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data) => {
            result.push(data); 
          })
          .on("end", () => {
            resolve(); 
          })
          .on("error", (err) => {
            reject(err); 
          });
        });
        
        
    console.log("result",result);






    //console.log("Token from cookie:", req.cookies.auth_token);
    const data = getTokenData(req);
    //console.log(data);
   const association_id = data.association_id;
   //console.log("ass id",association_id);






   console.log("4");
    const client = await pool.connect();
  
    try {
      
      await client.query('BEGIN');
  
      //start logic space

       const hashedPassword = await bcrypt.hash("qwerty",10);
       // const a = await client.query('INSERT INTO USERS (association_id,role,email,password) VALUES ($1,$2,$3,$4)',[14,'member','ours@gmail.com',hashedPassword])

        const responseFromDataBase = await client.query(`SELECT * FROM users WHERE association_id = $1 AND role = $2`,[association_id,'member'])
        const dataBaseUsers = responseFromDataBase.rows;
       
       
       const inputSet = new Set(result.map(user => user.email.trim()).filter(email => email !== ''));
       const databaseSet = new Set(dataBaseUsers.map(user => user.email));
       console.log("inputSet",inputSet);
       console.log("databaseSet",databaseSet);

       const newInputEmails = [...inputSet].filter(user => !databaseSet.has(user));

       for (let i = 0;i<newInputEmails.length;i++){


                const a = await client.query('INSERT INTO USERS (association_id,role,email) VALUES ($1,$2,$3)',[association_id,'member',newInputEmails[i]])


       }
        

      // console.log("users:",users.rows);
       // const outPuh = syncUsersWithResult(result,users.rows);
        //console.log("updated users:",outPuh);
      


      //end logic space

    await client.query('COMMIT');
    } catch (err) {
      
      await client.query('ROLLBACK');
      console.error('Error processing data', err);
    } finally {
      
      client.release();
    }





res.json({'message':"done"});



})















server.get("/fetchUsers",async(req,res)=>{



    const tokenData = getTokenData(req);
    const association_id = tokenData.association_id
    console.log(association_id);


    const response = await pool.query(`SELECT email,role,id FROM users WHERE association_id = $1`,[association_id]);
    const message = response.rows;
    


    res.status(200).json({message});
})









server.post("/deleteMember",async(req,res)=>{



    const id = req.body.id;
    try{
    const response = await pool.query(`DELETE FROM users WHERE id = $1`,[id]);
    }catch(err){
    
    res.status(400).json({'message':"user not deleted"});
    
    }
    
    res.status(200).json({'message':"user deleted"});
    
    
    })






















server.post("/addMember",async(req,res)=>{

    

    const email = req.body.email;
    const cellNumber = req.body.cellNumber;
    const tokenData = getTokenData(req);
    const association_id = tokenData.association_id;
    const role = 'member';
    const id = tokenData.id;

    console.log("JWT Secret in addMember:", process.env.SECRET_KEY);

    if(!email || !cellNumber|| !tokenData || !association_id || !role ){
        console.log("attribute not found");

        return res.json(400).status({'message':"attribute not found"});
    }

    let newMemberId;
    try{
   const response = await pool.query(`INSERT INTO users(association_id,role,email) 
    VALUES($1,$2,$3) RETURNING id`,[association_id,role,email]);
    newMemberId = response.rows[0].id
   }catch(err){
    console.log(err);
    return res.json(400).status({'message':"user not added to database"});


   }



   // create token

   


   const payload = {role,"id":newMemberId,association_id};
   const secretKey = process.env.SECRET_KEY;
   console.log("JWT Secret in signing:", process.env.SECRET_KEY);

   const token = jwt.sign(payload,secretKey,{ expiresIn: "7d" });
   console.log("THE TOKEN BEFORE EMAIL:",token);


try{
   const decoded = jwt.verify(token, process.env.SECRET_KEY);  
   console.log("add token status: WORKS");

}catch(err){

  console.log("add token status: ERROR");


}








   
   //send email



        const createPasswordLink = process.env.FRONTEND_ORIGIN +"/create_Password?user=" + token;
        
        const transporter = nodemailer.createTransport({  service: "gmail",
            auth: {
                user: "roryramsey1@gmail.com",
                pass: "fuhk djjr fvii jirh",
            }});



            await transporter.sendMail({
                from: "roryramsey1@gmail.com",
                to: email,
                subject: "Do you have any lemons left",
                text: `here is the link: ` + createPasswordLink  +` I was just checking in. I rember their were some lomons. thanks. -Bob`,
            });




   console.log("user added")
    return res.json(200).status({'message':"user added"});





})















// documents dashboard



server.get("/queryDocumentsForDash",async(req,res)=>{





    const tokenData = getTokenData(req);
    association_id = tokenData.association_id

   const response = await pool.query(`SELECT id,file_name,uploaded_at FROM documents WHERE association_id = $1`,[association_id]);
   const docs = response.rows;


   console.log(docs);

return res.status(200).json({docs});









})








server.post("/deleteDocumentFromDashBoard",async(req,res)=>{







const id = req.body.id;
const response = await pool.query(`DELETE FROM documents WHERE id = $1`,[id]);

return res.status(200).json({'message':"done"});



})


















//set password
server.post("/selectPassword", async(req,res)=>{

console.log("req.body:", req.body);

const password = req.body.password;

const tokenData = getTokenData(req);
const id = tokenData.id
association_id = tokenData.association_id
console.log("tokenData: ",tokenData);

console.log("JWT Secret in verification:", process.env.SECRET_KEY);




const hashedPassword = await bcrypt.hash(password,10);


const response = await pool.query(`UPDATE users SET password = $1 WHERE id = $2`,[hashedPassword,id])


return res.status(200).json({"message":"password made"});


//updata database with password


// return response






})










server.post("/signInUserInitialCreation",(req,res)=>{






const token = req.body.user;
console.log("THE TOKEN AFTER EMAIL:",token);

try{
  const decoded = jwt.verify(token, process.env.SECRET_KEY);  
  console.log("add token status: WORKS");

}catch(err){

 console.log("add token status: ERROR");


}





res.cookie("auth_token",token,
    {


        httpOnly:process.env.HTTP_ONLY === "true",
        secure:process.env.SECURE === "true",
        sameSite:process.env.SAME_SITE,
        maxAge: 7 * 24 * 60 * 60 * 1000




    });
    
    console.log("Token received in signInUserInitialCreation:", req.body.user);


res.status(200).json({'message':'log in complete'});







})

































server.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users LIMIT 5");
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database query failed" });
  }
});





















const PORT = process.env.PORT || 3000;






server.get("/", (req, res) => {
  res.send("Backend is working!");
});




server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});