// const formidable = require("formidable");
// const _ = require("lodash");
const fs = require("fs");
// const csv = require("csv-parser");

const Product = require("../models/property");
// const Category = require("../models/category");
// const Brand = require("../models/brand");
// const { request } = require("express");
let mongoose = require("mongoose");
// const sgMail = require("@sendgrid/mail");
// const AttributeDetail = require("../models/attributedetail");
// const VendorInfo = require("../models/vendorinfo");
// const Area1 = require("../models/area");
// const Stock = require("../models/stock");
// const { s3, BUCKET_NAME } = require("../config/aws.js");
// const vendorbussiness = require("../models/vendorbussiness");
// const { isArray } = require("lodash");

// const file = require('../public/files/input.csv')
// const redis = require("redis");
// const client = redis.createClient();redis://127.0.0.1:6379  port: 18929, host: 'ec2-34-235-25-121.compute-1.amazonaws.com'
// let REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1';


// client.on('error', (err) => {
//   console.log("Error " + err)
// });

// exports.getProduct = async (req, res, next) => {
//   let arr = [];
//   let data = await Product.find().lean()
//     .then(async (post) => {
//       console.log("post", arr);
//       post.map(async (result) => {
//         // console.log("result", result._id);
//         let data2 = await Product.findById(result._id).lean()
//           .populate("category_id")
//           .populate("brand_id")
//           .populate("vendor_id");

//         arr.push(data2);
//       });
//     })
//     .then(() => {

//       setTimeout(() => {
//         console.log("arr", arr);

//         res.status(200).json({
//           message: "Post Fetch Successfully",
//           data: arr,
//         });
//       }, 2500);
//     })
//     .catch((err) => console.log(err));
// };

exports.getArea = async (req, res, next) => {
  // let brandList = [];
  let arr = [];
  // let productObjectList = [];
  // const desID = req.params.id;
  // let category = null;
  try {
    // get coordinates [ <longitude> , <latitude> ]

    // var lat = req.body.latitude;
    // var long = req.body.longitude;
    // var distance = req.body.distance;

    let dist = 10 * 1000;
    let dat2 = "";

    let data0;
    let area = await Area1.find().lean();
    await Promise.all(
      area.map(async (t1) => {
        let lat1 = t1.location.coordinates[0];
        let lon1 = t1.location.coordinates[1];

        let lat2 = req.body.longitude;
        let lon2 = req.body.latitude;

        function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = deg2rad(lat2 - lat1); // deg2rad below
          var dLon = deg2rad(lon2 - lon1);
          var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
              Math.cos(deg2rad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          var d = R * c; // Distance in km
          return d;
        }
        function deg2rad(deg) {
          return deg * (Math.PI / 180);
        }

        let data = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2).toFixed(1);

        if (10 >= data) {
          console.log("valueeee", data);
          let vendor = await vendorbussiness
            .find({ area_id: t1._id })
            .then(async (dat3) => {
              dat3.map(async (dat5) => {
                // await Product.find({ vendor_id: dat5.vendor_id })
                //   .then((daa) => {
                //     // console.log('daa',daa)
                //     arr.push(daa);
                //   })
                //   .then((dddd) => {
                //     // console.log('dddddd',arr)
                //   });
                // // console.log('dat5',dat5)

                if (dat5.vendor_id) {
                  data0 = await Product.find({
                    vendor_id: dat5.vendor_id,
                  }).lean()
                  .populate("category_id")
                  .lean()
                  .populate("brand_id")
                  .lean()
                  .populate("vendor_id")
                  .lean()
                  await Promise.all(
                    data0.map((t9) => {
                      console.log("asdd", t9);
                      arr.push(t9);
                    })
                  );
                  // console.log('test2222',arr)
                  res.json({
                    message: "fetch data successfully",
                    data: arr,
                  });

                  //                       if (resd.length) {
                  //                         resd.map(t1=>{

                  //                           arr.push(t1);

                  //                         })
                }
              });
            });
          //                 // console.log('data1111',dat3[1])
          //                 dat3.map(async (dat5) => {
          //                   // await Product.find({vendor_id:dat5.vendor_id}).then(daa=>{
          //                   //   // console.log('daa',daa)
          //                   //   arr.push(daa)
          //                   // }).then(dddd=>{
          //                   //   console.log('dddddd',arr)

          //                   // })
          //                   // console.log('dat5',dat5)

          //                   if(dat5.vendor_id){

          //                     data0 = await Product.find({ vendor_id: dat5.vendor_id })
          //                     .then(async(resd) => {

          //                       if (resd.length) {
          //                         resd.map(t1=>{

          //                           arr.push(t1);

          //                         })

          //                         // console.log('resd',arr)

          //                       }
          //                     })

          //                   }

          //                 });
          //               });
          //           }
          //         } //if
        }
      })
    );

    //  let area = await Area1.find().then(async (post) => {
    //     // await Promise.all(
    //       let t6=await Promise.all(
    //       post.map(async (dat) => {
    //         if (dat) {
    //           let lat1 = dat.location.coordinates[0];
    //           let lon1 = dat.location.coordinates[1];

    //           let lat2 = req.body.longitude;
    //           let lon2 = req.body.latitude;

    //           function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    //             var R = 6371; // Radius of the earth in km
    //             var dLat = deg2rad(lat2 - lat1); // deg2rad below
    //             var dLon = deg2rad(lon2 - lon1);
    //             var a =
    //               Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    //               Math.cos(deg2rad(lat1)) *
    //                 Math.cos(deg2rad(lat2)) *
    //                 Math.sin(dLon / 2) *
    //                 Math.sin(dLon / 2);
    //             var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    //             var d = R * c; // Distance in km
    //             return d;
    //           }
    //           function deg2rad(deg) {
    //             return deg * (Math.PI / 180);
    //           }

    //           let data = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2).toFixed(
    //             1
    //           );
    //           if (10 >= data) {
    //             console.log('valueeee',dat)

    //             let vendor = await vendorbussiness
    //               .find({ area_id: dat._id })
    //               .then(async (dat3) => {
    //                 // console.log('data1111',dat3[1])
    //                 dat3.map(async (dat5) => {
    //                   // await Product.find({vendor_id:dat5.vendor_id}).then(daa=>{
    //                   //   // console.log('daa',daa)
    //                   //   arr.push(daa)
    //                   // }).then(dddd=>{
    //                   //   console.log('dddddd',arr)

    //                   // })
    //                   // console.log('dat5',dat5)

    //                   if(dat5.vendor_id){

    //                     data0 = await Product.find({ vendor_id: dat5.vendor_id })
    //                     .then(async(resd) => {

    //                       if (resd.length) {
    //                         resd.map(t1=>{

    //                           arr.push(t1);

    //                         })

    //                         // console.log('resd',arr)

    //                       }
    //                     })

    //                   }

    //                 });
    //               });
    //           }
    //         } //if

    //         // dat.location.coordinates.map(dat12=>{
    //         //   console.log('dat1',dat12);

    //         // console.log('data',arr)

    //         // })
    //       })
    //     // );

    //       )

    //     //  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2).toFixed(1)
    //   }); //first

    //   // console.log('t11',data0)
    //   console.log('t112',arr)
    //   await Promise.all(t6)

    //   console.log('t112',arr)

    // console.log('t11',arr)
    //   setTimeout(() => {
    //     res.json({
    //       message:"fetch successfully",
    //           data: arr
    //     })
    //   }, 2000);

    //const maxDistance = parseFloat(req.query.maxDistance);
    // const options = {near :[longitude,latitude],maxDistance:10000}
    // Area.find({

    //   location: {
    //     $near : {

    //       $geometry : {
    //         type : 'Point',
    //         coordinates:[24.913142, 67.089761],
    //         spherical: true
    //       },
    //       $maxDistance: 1000
    //     }
    //   }
    // }).find((error,results)=>{
    //   if (error) console.log(error);
    // //console.log(JSON.stringify(results, 0, 2));
    // res.status(200).json({
    //   message:"fetch successfully",
    //   data: results
    // }

    // )

    // });
    //  });
    // Area.find({
    // location: {
    //   $near: {
    //       $maxDistance: 1150,
    //       $geometry: {
    //           type: 'Point',
    //           coordinates: [24.913320, 67.090428]
    //       }
    //   }
    // }
    // }, function (err, result) {
    // if (err) {
    //   return console.log(err);
    // }

    // res.json({
    //   message:"fetch successfully",
    //       data: result
    // })

    // });

    // Area.where('location').near({
    //   center: {
    //       type: 'Point',
    //       // coordinates: [24.913142, 67.089761]
    //       coordinates: [24.913320, 67.090428]
    //   },

    //   // Converting meters to miles
    //   maxDistance: 10/111.12,
    //   spherical: true
    // }).find((error,results)=>{
    //     if (error) console.log(error);
    //   //console.log(JSON.stringify(results, 0, 2));
    //   res.status(200).json({
    //     message:"fetch successfully",
    //     data: results
    //   }

    //   )

    //   });

    // Area.find({
    //   location: {
    //     $near: {
    //       $maxDistance: 100/111.12, // 100km
    //       $geometry: {
    //         type: "Point",
    //         coordinates: [67.0970916, 24.9180271] // [lon, lat]
    //       }
    //     }
    //   }
    // }).exec(res => console.log(res));

    // var query = Area.find({'type':'Point'});

    // // ...include filter by Max Distance
    // if (distance) {

    //     // Using MongoDB's geospatial querying features.
    //     query = query.where('geo.coordinates').near({
    //         center: {
    //             type: 'Point',
    //             coordinates: [lat, long]
    //         },

    //         // Converting meters to miles
    //         maxDistance: distance * 1609.34,
    //         spherical: true
    //     });
    // }

    // // Execute Query and Return the Query Results
    // query.exec(function(err, geoObjects) {
    //     if (err)
    //         res.send(err);

    //     // If no errors, respond with a JSON
    //     res.json(geoObjects);
    // });

    // try {
    //   const product = await Product.findById(desID).populate("vendor_id");

    //   console.log("product", product.is_view);
    //   Product.findOneAndUpdate(
    //     { _id: product._id },
    //     { $inc: { is_view: 1 } },
    //     { new: true }
    //   )
    //     .then((result) => {
    //       console.log("updated");
    //     })
    //     .catch((err) => console.log(err));

    //   const data = await Product.findById(desID)
    //     .populate("category_id")
    //     .populate("vendor_id")
    //     .populate("brand_id")
    //     .exec((err, result) => {
    //       if (err) {
    //         res.json({
    //           success: false,
    //           message: "Product data is not found",
    //         });
    //       } else {
    //         if (result) {
    //           res.json({
    //             success: true,
    //             data: result,
    //           });
    //         }
    //       }
    //     });

    // } catch (error) {}
  } catch (error) {}
};

exports.getProductInfobySearch = async(req, res, next) => {

  
  // let data1 = req.body.data;
  let arr=[];
  let property_type=req.body.property_type;
  let title=req.body.title;
  let location=req.body.location;
  let minprice=req.body.minprice;
  let maxprice=req.body.maxprice;
  let bedrooms=req.body.bedrooms;
  let bathrooms=req.body.bathrooms;
  let floor_size=req.body.floor_size;
  let erf_size=req.body.erf_size;
  let pet_friendly=req.body.pet_friendly;
  let garden=req.body.garden;
  let pool=req.body.pool;
  let parking=req.body.parking;
  let flatlet=req.body.flatlet;
  let retirement=req.body.retirement;
  let repossessed=req.body.repossessed;
  let on_show=req.body.on_show;
  let auction=req.body.auction;
  console.log("body data1",req.body);

  if(location){
    location=location.toLowerCase();
  }

 
    console.log("body data",req.body);
    
      let data=await Product.find({$or: [{property_type : { $in : property_type}},{title:title},{minprice:minprice},{maxprice:maxprice},{bedrooms:bedrooms},{bathrooms:bathrooms},{floor_size:floor_size},{erf_size:erf_size},{pet_friendly:pet_friendly},{garden:garden},{pool:pool},{flatlet:flatlet},{retirement:retirement},{repossessed:repossessed},{on_show:on_show},{auction:auction},{parking:parking},{location:location}]})
      .then(t1=>{
        console.log(t1);
        if(t1){

          res.json({
            message:"fatch the data successfully",
            data:t1
          })

        }
        else{
          res.json({
            message:"Data Not Found",
            data:[]
          })
        }
      })

  

 
};

// var data = new Queue('data coding', {redis: {port: 18929, host: 'ec2-34-235-25-121.compute-1.amazonaws.com', password: 'pf5e966f5f3980c730b75368cf14182125ad1d162d4f5d28aec37a160d3c1789b'}}); // Specify Redis connection using object

// // const {
// //   Worker, isMainThread, 
// // } = require('worker_threads');

// data.process(function(job, done){
//   // job.data contains the custom data passed when the job was created
//   // job.jobId contains id of this job.
//   // transcode video asynchronously and report progress
//   let x=0;
  

//   job.progress(42);

//   let data=0;
//   while (counter<1e9){
//     counter++
//   }
//   // call done when finished
//   done();
  
//   // or give a error if error
//   // done(Error('error transcoding'));
  
//   // or pass it a result
//   done(null, { framerate: 29.5 /* etc... */ });
  
//   // If the job throws an unhandled exception it is also handled correctly
//   throw (Error('some unexpected error'));
//   });

//   data.add({}, { repeat: { cron: '0 8 * * *' } });

// const {
//     Worker, isMainThread, 
//   } = require('worker_threads');
  

  exports.getProduct = async (req, res, next) => {
    


    let arr = [];
  console.log("d1")
  
      let data = await Product.find().lean();
      // console.log(data)
      if (data.length) {
        await Promise.all(
          data.map(async (post) => {
            // console.log("result", post._id);
            let data2 = await Product.findById(post._id)
              .populate("category_id")
              .lean()
              .populate("brand_id")
              .lean()
              .populate("vendor_id")
              .lean();
            arr.push(data2);
          })
        );
//         // console.log("arr--", arr.length);
// let workQueue = new Queue('work', REDIS_URL);
         
//         let job = await workQueue.add();
        res.status(200).json({
          message: "Product Data Fetch Successfully",
          data: arr,
        });
        
     
      } else {
        res.status(400).json({
          message: "Product Data Fetch Failed",
        });
      }
    
      
    
  };
// exports.getProduct = async (req, res, next) => {
//   let arr = [];

//   try {
//     let data = await Product.find().lean();
//     // console.log(data)
//     if (data.length) {
//       await Promise.all(
//         data.map(async (post) => {
//           // console.log("result", post._id);
//           let data2 = await Product.findById(post._id)
//             .populate("category_id")
//             .lean()
//             .populate("brand_id")
//             .lean()
//             .populate("vendor_id")
//             .lean();
//           arr.push(data2);
//         })
//       );
//       // console.log("arr--", arr.length);

//       res.status(200).json({
//         message: "Product Data Fetch Successfully",
//         data: arr,
//       });
//     } else {
//       res.status(400).json({
//         message: "Product Data Fetch Failed",
//       });
//     }
//   } catch (error) {
//     res.status(400).json({
//       message: "Problem in fetching Products",
//       error: error,
//     });
//   }
// };

exports.getProductbylimit = async (req, res, next) => {
  var query = {};
  var options = {
    select: "title date author",
    // sort:     { date: -1 },
    // populate: 'author',
    lean: true,
    offset: 20,
    limit: 10,
  };

  let arr = [];
  let page =  1;
  let r_limit = req.params.limit || 10;

  console.log("result");

  let limit = parseInt(r_limit);

  try {
    //     Product.paginate(query, options).then(function(result) {
    //       console.log('data',result);
    //   // ...
    // });

    let data = await Product.paginate(
      {},
      { page: page, limit: limit },
      async (err, result) => {
        console.log("result2", result.docs);
        //  console.log("data",data);

        await Promise.all(
          result.docs.map(async (post) => {
            console.log("result", post._id);
            let data2 = await Product.findById(post._id)
              .lean()
              .populate("category_id")
              .populate("brand_id")
              .populate("vendor_id");

            arr.push(data2);
          })
        );

        res.status(200).json({
          message: "Data Fetch Successfully",
          data: arr,
        });

        // result.docs
        // result.total
        // result.limit - 10
        // result.page - 3
        // result.pages
      }
    );

  } catch (error) {
    res.status(400).json({
      message: "Problem in fetching Products",
      error: error,
    });
  }
};

// get by id

// // get by id
// exports.getIdbyProduct = async (req, res, next) => {

//     let ProductList = [];
//     let ProductObjectList = [];
//     const desID = req.params.id;

//     try {

//      const product= Product.findById(desID).
//      select([
//         "category_id",
//         "title",
//         "description",
//         "meta_description",
//         "meta_title",
//         "photo",
//         "brand_id",
//         "long_description",
//         "care",
//         "weight",
//         "quantity",
//         "price",
//         "discount_price",
//         "stockandVariety"
//       ]).then(resp =>{
//         console.log("resp",resp)
//         // ProductList.push(resp.category_id)
//         // console.log(ProductList)
//         // ProductList.map(async perm => {
//         //     //  Brand.findOne({_id:perm})
//         //       // .then(res => ProductObjectList.push(res))
//         //        await Category.findOne({_id:perm})
//         //         .then(res =>ProductObjectList.push(res))

//           })

//         //   ProductList.push(resp.brand_id)
//         //   ProductList.map(async perm => {
//         //     //  Brand.findOne({_id:perm})
//         //       // .then(res => ProductObjectList.push(res))
//         //        await Brand.findOne({_id:perm})
//         //         .then(res =>ProductObjectList.push(res))
//         //         .then(result=> res.json({
//         //             message: "Fetch by id successfully",
//         //               permissionList:permissionObjectList}))

//         //   })

//     //   })
//       .catch(err=>res.json({
//           message:err
//       }))

//     } catch (error) {
//       console.log(error.response)
//     }

exports.getIdbyProduct = async (req, res, next) => {
  let brandList = [];
  let productObjectList = [];
  const desID = req.params.id;
  let category = null;

  try {
    const product = await Product.findById(desID).populate("vendor_id");

    console.log("product", product.is_view);
    Product.findOneAndUpdate(
      { _id: product._id },
      { $inc: { is_view: 1 } },
      { new: true }
    )
      .then((result) => {
        console.log("updated");
      })
      .catch((err) => console.log(err));

    const data = await Product.findById(desID)
      .populate("category_id")
      .populate("vendor_id")
      .populate("brand_id")
      .exec((err, result) => {
        if (err) {
          res.json({
            success: false,
            message: "Product data is not found",
          });
        } else {
          if (result) {
            res.json({
              success: true,
              data: result,
            });
          }
        }
      });

    // productObjectList.push(product);

    // product.brand_id.map(async (brands) => {
    //   let i = 0;

    //   Brand.findOne({ _id: brands })
    //     .then((res) => brandList.push(res))
    //     .then((res) => productObjectList.push(brandList))
    //     .then((res) => console.log("brand", brandList))
    //     .then((result) => {
    //       if (i === 0) {
    //         Category.findOne({ _id: product.category_id })
    //           .then((result) => {
    //             category = result;
    //             console.log("category ", category);
    //             productObjectList.push(category);
    //           })
    //           .then((result) => console.log(productObjectList))
    //           .then((result) =>
    //             res.json({
    //               message: "fetch by id data successfully",
    //               data: productObjectList,
    //             })
    //           );

    //         i++;
    //       }
    //     });
    // });
  } catch (error) {}
};

exports.getIdbyVendorInfo = async (req, res, next) => {
  const desID = req.params.id;
  console.log(desID);

  try {
    const data = await VendorInfo.find({ vendor_id: desID })
      .populate({
        path: "vendor_id",
        // match: { age: { $gte: 21 }},
        // select: 'name -_id',
        select: "status ",
      })
      .populate({
        path: "brand_id",

        select: "status  brand_name",
      })
      .populate({
        path: "category_id",

        select: "status  title",
      })
      .exec((err, result) => {
        if (err) {
          res.json({
            success: false,
            message: "Vendor Data  not found",
          });
        } else {
          if (result) {
            res.json({
              success: true,
              data: result,
            });
          }
        }
      });
  } catch (error) {
    console.log(error.response);
  }
};

exports.getIdbyCategory = async (req, res, next) => {
  const desID = req.params.id;
  console.log(desID);

  try {
    const data = await Product.find({ category_id: desID })
      .populate("vendor_id")
      .populate({
        path: "brand_id",

        select: "status  brand_name",
      })
      .populate({
        path: "category_id",

        select: "status  title",
      })
      .exec((err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Category data not found",
          });
        } else {
          if (result) {
            res.json({
              success: true,
              data: result,
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Data Not found",
            });
          }
        }
      });
  } catch (error) {
    console.log(error.response);
  }
};

exports.getIdbyBrand = async (req, res, next) => {
  const desID = req.params.id;
  console.log(desID);

  try {
    const data = await Product.find({ brand_id: desID })
      .populate("vendor_id")
      .populate({
        path: "brand_id",

        select: "status  brand_name",
      })
      .populate({
        path: "category_id",

        select: "status  title",
      })
      .exec((err, result) => {
        if (err) {
          res.json({
            success: false,
            message: "Brand data  not found",
          });
        } else {
          if (result) {
            res.json({
              success: true,
              data: result,
            });
          } else {
            res.status(400).json({
              success: false,
              message: "Data Not found",
            });
          }
        }
      });
  } catch (error) {
    console.log(error.response);
  }
};

exports.getIdbyApproved = async (req, res, next) => {
  sgMail.setApiKey(
    "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"
  );

  let params = {
    approved: req.body.approved,
  };
  console.log("params", params);
  for (let prop in params) if (!params[prop]) delete params[prop];
  console.log("params", params);

  Product.findOneAndUpdate(
    { _id: req.params.id },

    params
  )
    .populate("vendor_id")
    .then((result) => {
      // console.log(result);
      if (result.approved == true) {
        console.log("if condition");
        console.log("result", result.vendor_id.email);

        const msg = {
          to: result.vendor_id.email, // Change to your recipient
          from: "juniadahmed12@gmail.com", // Change to your verified sender
          subject: "Your activation code is",
          text: "and easy to do anywhere, even with Node.js",
          html:
            "Dear user </br> <b> Your product have been approved by admin . Product details is below </br>  " +
            " product title : " +
            result.title +
            "</br>" +
            " prdouct price " +
            result.price +
            "</br>" +
            result.description +
            ":product description",
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.log("else condition");

        console.log("result", result.vendor_id.email);

        const msg = {
          to: result.vendor_id.email, // Change to your recipient
          from: "juniadahmed12@gmail.com", // Change to your verified sender
          subject: "Your activation code is",
          text: "and easy to do anywhere, even with Node.js",
          html:
            "Dear user </br> <b> Your product have not  been approved by admin . Product details is below </br>  " +
            " product title : " +
            result.title +
            "</br>" +
            " prdouct price " +
            result.price +
            "</br>" +
            result.description +
            ":product description",
        };
        sgMail
          .send(msg)
          .then(() => {
            console.log("Email sent");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })
    .catch((err) => console.log(err));
};

exports.getIdbyVendor = async (req, res, next) => {
  const desID = req.params.id;
  console.log(desID);

  try {
    const data = await Product.find({ vendor_id: desID })
      .populate("vendor_id")
      .populate({
        path: "brand_id",

        select: "status  brand_name",
      })
      .populate({
        path: "category_id",

        select: "status  title",
      })
      .exec((err, result) => {
        if (err) {
          res.json({
            success: false,
            message: "Vendor data  not found",
          });
        } else {
          if (result) {
            // console.log("result", result);
            res.json({
              success: true,
              data: result,
            });
          }
        }
      });
  } catch (error) {
    console.log(error.response);
  }
};

exports.getSlugbyProduct = async (req, res, next) => {
  const desID = req.params.slug;
  console.log(desID);
  try {
    const product = await Product.find({
      slug: { $regex: desID, $options: "i" },
    }).exec((err, product) => {
      if (err) {
        res.json({
          success: false,
          message: "product data is not found",
        });
      } else {
        if (product) {
          res.json({
            success: true,
            data: product,
          });
        }
      }
    });
  } catch (error) {
    console.log(error.response);
  }
};

exports.getProductimg = (req, res, next) => {

    var img = fs.readFileSync("public/propertyad/" + req.params.img);
    res.writeHead(200, { "Content-Type": "image/gif" });
    res.end(img, "binary");
    // let cat='data';
    // res.send(".public\photo-1200px-node.js_logo.svg.png")
  
};

exports.addProduct = (req, res, next) => {
  let cat;
  console.log("req.body data",req.body);
  let reqFiles ;

  const url = req.protocol + "://" + req.get("host");
  console.log(req.files);
  if(req.files['photo']){
  
   
    reqFiles = [];
     for (var i = 0; i < req.files['photo'].length; i++) {
      reqFiles.push(url + '/property/getimg/' + req.files['photo'][i].filename)
     //  const reqFiles = req.files && req.files['photo']&& req.files['photo'].length ? [] : '';
      console.log('lenght',reqFiles);
      }
     }
     
  const reqfile = req.files && req.files['customer_photo']&& req.files['customer_photo'].length ? []:'';


 
  
// req.files && req.files['photo']&& req.files['photo'].length && reqFiles.push(url + '/category/getimg/' +req.files['photo'][0].filename)
 req.files && req.files['customer_photo'] &&req.files['customer_photo'].length && reqfile.push(url + '/property/getimg/' + req.files['customer_photo'][0].filename)


  try {
 
  console.log("body",req.body);
      cat = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        property_type : req.body.property_type,
        minprice: req.body.minprice,
        maxprice: req.body.maxprice,
        photo: reqFiles,
        bedrooms: req.body.bedrooms,
        bathrooms : req.body.bathrooms ,
        parking: req.body.parking,
        floor_size: req.body.floor_size,
        erf_size: req.body.erf_size,
        pet_friendly:req.body.pet_friendly, 
        garden:req.body.garden,
        pool:req.body.pool,
        retirement:req.body.retirement,
        on_show:req.body.on_show,
        auction:req.body.auction,
        garden:req.body.garden,
        location:req.body.location,
        name:req.body.name,
        customer_photo:reqfile,
        phone_number:req.body.phone_number,
        price: req.body.price,
      });
     cat.location = cat.location.toLowerCase();

      console.log("cat if", cat);
      cat.save().then((result) => {
        console.log(result);

        res.status(200).json({
          message: "Product created successfully!",
          data: cat,
        });
      });
    }
    // }
   catch (err) {
    console.log(err);
    res.json({
      message: "Product data created failed!",
      data: err,
    });
  }
};

exports.editProduct = async (req, res, next) => {

  let reqFiles =  '';
  const url = req.protocol + '://' + req.get('host')
  console.log("req.File22",req.files)
  if(req.files['photo']){
    
   console.log("req.File221",req.body)

    
  
    for (var i = 0; i < req.files['photo'].length; i++) {
      reqFiles = [];
     reqFiles.push(url + '/property/getimg/' + req.files['photo'][i].fieldname)
    //  const reqFiles = req.files && req.files['photo']&& req.files['photo'].length ? [] : '';
    
     }
    }
    
  const reqfile = req.files && req.files['customer_photo']&& req.files['customer_photo'].length ? []:'';


 
  
// req.files && req.files['photo']&& req.files['photo'].length && reqFiles.push(url + '/category/getimg/' +req.files['photo'][0].filename)
 req.files && req.files['customer_photo'] &&req.files['customer_photo'].length && reqfile.push(url + '/property/getimg/' + req.files['customer_photo'][0].fieldname)

    
  let params;
  if (req.body.stockandVariety == "false") {
    params = {
      title: req.body.title,
        description: req.body.description,
        property_type : req.body.property_type,
        minprice: req.body.minprice,
        maxprice: req.body.maxprice,
        photo: reqFiles,
        bedrooms: req.body.bedrooms,
        bathrooms : req.body.bathrooms ,
        parking: req.body.parking,
        floor_size: req.body.floor_size,
        erf_size: req.body.erf_size,
        pet_friendly:req.body.pet_friendly, 
        garden:req.body.garden,
        pool:req.body.pool,
        retirement:req.body.retirement,
        on_show:req.body.on_show,
        auction:req.body.auction,
        garden:req.body.garden,
        location:req.body.location,
        name:req.body.name,
        customer_photo:reqfile,
        number:req.body.number,
        price: req.body.price,



    };

    console.log("params", params);
    for (let prop in params) if (!params[prop]) delete params[prop];
    console.log("params", params);
  
    const depID = req.params.id;

    Product.findOneAndUpdate({ _id: depID }, params).then((data1) => {
      res.json({
        message: "Product Updated successfully",
      
      });
    })
  } else {
    params = {
      category_id: req.body.category_id,
      title: req.body.title,
      description: req.body.description,
      meta_description: req.body.meta_description,
      meta_title: req.body.meta_title,
      photo: reqFiles,
      brand_id: req.body.brand_id,
      long_description: req.body.long_description,
      care: req.body.care,
      weight: req.body.weight,
      quantity: 0,
      price: 0,
      discount_price: 0,
      slug: req.body.slug,
      vendor_id: req.body.vendor_id,
      is_Active: req.body.is_Active,
      insidebox: req.body.insidebox,
      attribute_feature:req.body.attribute_feature,
      stockandVariety: req.body.stockandVariety,
    };
    console.log("params", params);
    for (let prop in params) if (!params[prop]) delete params[prop];
    console.log("params", params);
  
    const depID = req.params.id;
  
    const data = await Stock.find({
      product_id: depID,
    }).exec(async (err, result) => {
      if (err) {
        res.json({
          success: false,
          message: "Product data  not found",
        });
      } else {
        console.log("result", result);
  
        let att = req.body.attribute_id;
  
        let arr = [];
        if (result && result.length) {
          if (att && att.length > 0) {
            JSON.parse(att).map((data) => {
              if (data.data.length) {
                let a = [];
                let name;
                data.data.map((attr) => {
                  a.push(attr.label.toLowerCase());
                  name = attr.p_name.toLowerCase();
                });
  
                arr.push({ [name]: a });
              }
            });
            console.log("---------", arr);
  
            var keys = arr.map((o) => Object.keys(o)[0]); //Get the list of keys
            var myResult = arr
              .map((o) => Object.values(o)[0])
              .reduce((c, v) =>
                [].concat(...c.map((o) => v.map((x) => [].concat(o, x))))
              ) //Make all possible combinations
              .map((o) =>
                o.reduce(
                  (c, v, i) =>
                    Object.assign(c, {
                      [keys[i]]: v,
                      price: 0,
                      discount: 0,
                      from: "",
                      to: "",
                    }),
                  {}
                )
              ); //Construct the final format
  
            Stock.findOneAndUpdate({ _id: result[0]._id }, { data: myResult })
              .then((result) => {
                Product.findOneAndUpdate({ _id: depID }, params).then((data1) => {
                  res.json({
                    message: " Product Updated successfully",
                    data: myResult,
                  });
                });
              })
              .catch((err) => console.log(err));
  
            // const dep = new Stock({
            //   product_id: depID,
            //   data: result,
            // });
          } else {
            console.log("update--------------");
            Stock.findOneAndRemove({ _id: result[0]._id }).then((result) => {
              Product.findOneAndUpdate({ _id: depID }, params).then((data1) => {
                res.json({
                  message: " Product Updated successfully",
                  data: myResult,
                });
              });
            });
          }
        } else {
          if (att && att.length > 0) {
            JSON.parse(att).map((data) => {
              if (data.data.length) {
                let a = [];
                let name;
                data.data.map((attr) => {
                  a.push(attr.label.toLowerCase());
                  name = attr.p_name.toLowerCase();
                });
  
                arr.push({ [name]: a });
              }
            });
            console.log("---------", arr);
  
            var keys = arr.map((o) => Object.keys(o)[0]); //Get the list of keys
            var result = arr
              .map((o) => Object.values(o)[0])
              .reduce((c, v) =>
                [].concat(...c.map((o) => v.map((x) => [].concat(o, x))))
              ) //Make all possible combinations
              .map((o) =>
                o.reduce(
                  (c, v, i) =>
                    Object.assign(c, {
                      [keys[i]]: v,
                      price: 0,
                      discount: 0,
                      from: "",
                      to: "",
                    }),
                  {}
                )
              );
  
            console.log("*****************", result);
  
            const dep = new Stock({
              product_id: depID,
              data: result,
            });
            dep.save().then((result) => {
              Product.findOneAndUpdate({ _id: depID }, params).then((data1) => {
                res.json({
                  message: " Product Updated successfully",
                });
              });
              // res.json({
              //   message: "Product data created successfully!",
              //   success: true,
              //   data: cat,
              // });
            });
          } else {
            console.log("update--------------");
            Product.findOneAndUpdate({ _id: depID }, params).then((data1) => {
              res.json({
                message: " Product Updated successfully",
              });
            });
          }
        }
      }
    });
  }
      // if (result.length) {
      //   let oldData = [];
      //   console.log('************************',result);
      //   result.map( res => {
      //     // res.data.map()
      //     oldData = res.data;
      //     console.log(res);
      //   })

      //   let att = req.body.attribute_id;
      //   let arr = [];
      //   if(att.length>0){
      //     JSON.parse(att).map((data) => {
      //       if (data.data.length) {
      //         let a = [];
      //         let name;
      //         data.data.map((attr) => {
      //           a.push(attr.label.toLowerCase());
      //           name = attr.p_name.toLowerCase();
      //         });

      //         arr.push({ [name]: a });
      //       }
      //     });
      //     console.log("---------", arr);

      //     var keys = arr.map((o) => Object.keys(o)[0]);
      //     var result = arr
      //       .map((o) => Object.values(o)[0])
      //       .reduce((c, v) =>
      //         [].concat(...c.map((o) => v.map((x) => [].concat(o, x))))
      //       )
      //       .map((o) =>
      //         o.reduce((c, v, i) => Object.assign(c, { [keys[i]]: v,price: 0,
      //                     discount: 0,
      //                     from: "",
      //                     to: "", }), {})
      //       );
      //   }

      //   if (JSON.stringify(oldData) !== JSON.stringify(result)) {
      //     let newData = []

      //     // await Promise.all( oldData.map(old => {
      //     //   let filter = result.filter(re => JSON.stringify(re) === JSON.stringify(old));
      //     //   if (filter.length) {
      //     //     newData.push(old)
      //     //   }
      //     //   // console.log(old);
      //     // }))

      //     // for (let i = 0; i < oldData.length; i++) {
      //     //   for (let j = 0; j < result.length; j++) {

      //     //     console.log('oldData-----------------',oldData[i]);
      //     //     console.log('result-----------------',result[j]);
      //     //   }
      //     // }

      //     // await Promise.all( result.map(old => {
      //     //   let filter2 = oldData.filter(re => JSON.stringify(Object.keys(re)) === JSON.stringify(Object.keys(old)) );
      //     //   if (filter2.length) {
      //     //     console.log('---++++++++',filter2);
      //     //     let filter = oldData.filter(re => JSON.stringify(re) === JSON.stringify(old));
      //     //     if (filter.length) {
      //     //       newData.push(old);
      //     //     }
      //     //   }else{

      //     //   }
      //     //   // console.log(old);
      //     // }))

      //     // await Promise.all( oldData.map(old => {
      //     //   let filter = oldData.filter(re => JSON.stringify(re) === JSON.stringify(old));
      //     //   if (filter.length) {
      //     //     newData.push(old);
      //     //   }
      //     //   // console.log(old);
      //     // }))

      //     console.log('----------------notsame',newData);
      //   }

      // } else {

      //   let att = req.body.attribute_id;
      //   let arr = [];
      //   if(att.length>0){
      //     JSON.parse(att).map((data) => {
      //       if (data.data.length) {
      //         let a = [];
      //         let name;
      //         data.data.map((attr) => {
      //           a.push(attr.label.toLowerCase());
      //           name = attr.p_name.toLowerCase();
      //         });

      //         arr.push({ [name]: a });
      //       }
      //     });
      //     console.log("---------", arr);

      //     var keys = arr.map((o) => Object.keys(o)[0]);
      //     var result = arr
      //       .map((o) => Object.values(o)[0])
      //       .reduce((c, v) =>
      //         [].concat(...c.map((o) => v.map((x) => [].concat(o, x))))
      //       )
      //       .map((o) =>
      //         o.reduce((c, v, i) => Object.assign(c, { [keys[i]]: v,price: 0,
      //                     discount: 0,
      //                     from: "",
      //                     to: "", }), {})
      //       );

      //     console.log("*****************", result);

      //     const dep = new Stock({
      //       product_id: depID,
      //       data: result,
      //     });

      //     dep.save().then((result) => {
      //           res.json({
      //             message: "Product Updated Successfully"
      //           });
      //         })

      //   }

      // }
    

  // Product.findOneAndUpdate(
  //   { _id: req.params.id },

  //   params
  // )
  //   .then((result) => {
  //     res.json({
  //       message: "Updated successfully",
  //       data: result,
  //     });
  //   })
  //   .catch((err) => console.log(err));
};
exports.deleteProduct = (req, res, next) => {
  const depID = req.params.id;

  Product.findByIdAndRemove(depID).then((result) => {
    if (!result) {
      const error = new HttpError("could not find post", 404);
      console.log(error);
      return next(error);
    }
    res.send({
      message: "deleted  successfully",
      result: result,
    });
  });
};
