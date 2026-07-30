<?php

namespace App\Exports;

use App\Models\Answer;
use App\Models\Question;
use App\Models\GuestAnswer;
use App\Models\InvitationGuests;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;

class ExportGuest implements FromCollection,WithHeadings
{

    private $status, $id;

    public function __construct($status,$id)
    {
        $this->status = $status;
        $this->id = $id;
    }

    public function collection()
    {
        $guests = InvitationGuests::where(['user_template_id' => $this->id])
        ->when($this->status == 'Attending', function ($q) {
            $q->where('is_attending', true);
        })->when($this->status == 'Regrets', function ($q) {
            $q->where(['status' => 'Sent', 'is_attending' => false]);
        })->when($this->status == 'Checked', function ($q) {
            $q->where('scanned_number','>' ,0);
        })->when($this->status == 'Answered', function ($q) {
            $q->has('guestAnswers');
        })->when($this->status == 'not_answered', function ($q) {
            $q->where('is_attending', true)->doesntHave('guestAnswers');
        })->when($this->status == 'not_responded', function ($q) {
            $q->where('is_attending', null);
        })
        ->latest()->get();

        $collection = new Collection();
        $questions = Question::where(['user_template_id' => $this->id])->get();

        return $guests->map(function ($guest) use ($questions) {
            // Start each row with the user name
            $row = collect([$guest->name]);

            $answers = $questions->map(function ($question) use ($guest) {
                if ($question->type === 'short') {
                    return GuestAnswer::where('invitation_guest_id', $guest->id)
                    ->where('question_id', $question->id)
                    ->value('answer') ?: '-';
                } else {
                    // Multi-choice type: Fetch from guest_answers table
                    $answerIds = GuestAnswer::where('invitation_guest_id', $guest->id)
                        ->where('question_id', $question->id)
                        ->pluck('answer_id')->toArray();
                    $answers = Answer::select('title')->whereIn('id',$answerIds)->get();
                    $ans_arr = [] ;
                    foreach($answers as $answer) {
                        $ans_arr[] = $answer->title;
                    }
                    return $answers ? $ans_arr : '-'; // Replace with actual option text if needed
                }
                return '-'; // Default for unknown types
            });
            // Merge user name with the answers
            return $row->merge($answers);
        });
    }


    public function headings(): array
    {
        $questions = Question::where(['user_template_id' => $this->id])->pluck('title')->toArray();
        $arr = ['Name'];
        return array_merge($arr, $questions);
        
    }



}