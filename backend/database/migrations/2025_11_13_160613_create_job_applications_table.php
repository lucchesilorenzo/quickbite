<?php

declare(strict_types=1);

use App\Enums\JobApplicationStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_applications', function (Blueprint $table): void {
            $table->uuid('id')->primary();
            $table->foreignUuid('job_post_id')->constrained()->cascadeOnDelete();
            $table->foreignUuid('rider_id')->constrained('users')->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('resume');
            $table->enum('status', JobApplicationStatus::values())->default(JobApplicationStatus::PENDING);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
