require 'csv'
require 'json'

all_sales = []

%w{bob roger jim}.each do |name|
  kid_data = [];
  data = CSV.read("./public/data/csv/#{name}.csv");
  kid_data << {'key'=>'sales','values'=>data.collect{|d|     [DateTime.parse(d[7]).to_time.to_f,d[1].to_f]}} 
  kid_data << {'key'=>'remaining','values'=>data.collect{|d| [DateTime.parse(d[7]).to_time.to_f,d[3].to_f]}} 
  kid_data << {'key'=>'forecast','values'=>data.collect{|d| [DateTime.parse(d[7]).to_time.to_f,0]}} 

  all_sales << {'key'=>"#{name} sales",'values'=>data.collect{|d|     [DateTime.parse(d[7]).to_time.to_f,d[1].to_f]}} 

  (0..(kid_data[2]['values'].length)-1).each do |i|
    kid_data[2]['values'][i][1] = 100 - (100.0/(kid_data[2]['values'].length)*i)
  end

  File.open("./public/data/#{name}.json","w") do |f|
    f.write(kid_data.to_json)
  end
end


all_sales << {'key' => 'total sales', 'values' => []}
all_sales << {'key' => 'forecast', 'values' => []}
all_sales << {'key' => 'remaining', 'values' => []}

tally = 0

(0..(all_sales[0]['values'].length)-1).each do |i|
    all_sales[-2]['values'] <<  [all_sales[0]['values'][i][0] , 300 - (300.0/(all_sales[0]['values'].length)*i)]
    all_sales_total = all_sales[0]['values'][i][1] 
    all_sales_total += all_sales[0]['values'][i][1] 
    all_sales_total += all_sales[0]['values'][i][1] 
    all_sales[-3]['values'] <<  [all_sales[0]['values'][i][0] , all_sales_total  ]
    tally  += all_sales_total
    all_sales[-1]['values'] <<  [all_sales[0]['values'][i][0] , 300 - tally  ]
end

File.open("./public/data/all.json","w") do |f|
  f.write(all_sales.to_json)
end
