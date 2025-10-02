<?php

declare(strict_types=1);

use App\Broadcasting\PartnerChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{userId}.Restaurant.{restaurantId}', PartnerChannel::class);
