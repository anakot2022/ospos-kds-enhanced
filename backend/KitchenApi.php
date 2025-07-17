<?php
namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;

class KitchenApi extends ResourceController
{
    use ResponseTrait;

    public function pendingOrders()
    {
        $db = \Config\Database::connect();

        $sql = "
            SELECT 
                s.sale_id,
                s.sale_time,
                GROUP_CONCAT(CONCAT(i.name, ' x', si.quantity_purchased) SEPARATOR ', ') AS order_items,
                IFNULL(s.kitchen_station, 'default') AS station
            FROM sales s
            JOIN sales_items si ON s.sale_id = si.sale_id
            JOIN items i ON i.item_id = si.item_id
            JOIN categories c ON c.id = i.category
            WHERE c.name = 'FOOD'
              AND (s.kitchen_status IS NULL OR s.kitchen_status != 'completed')
            GROUP BY s.sale_id
            ORDER BY s.sale_time ASC
        ";

        $orders = $db->query($sql)->getResultArray();
        return $this->respond($orders);
    }

    public function complete($id)
    {
        $db = \Config\Database::connect();
        $builder = $db->table('sales');
        $builder->where('sale_id', $id)->update(['kitchen_status' => 'completed']);
        return $this->respond(['status' => 'ok']);
    }
}
